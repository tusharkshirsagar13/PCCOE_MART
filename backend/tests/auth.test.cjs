const { test } = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { spawn } = require("node:child_process");
const { app } = require("../dist/app");
const { UserModel } = require("../dist/models/userModel");
const { validateEnvironment } = require("../dist/config/database");

// Isolated fixture credentials; never create or reset a production account.
const credentials = { email: "auth-test@pccoepune.org", password: "test-password-123" };

test("configuration validation does not expose secrets", () => {
  const previous = { DB_URL: process.env.DB_URL, JWT_SECRET: process.env.JWT_SECRET };
  try {
    delete process.env.DB_URL;
    assert.throws(validateEnvironment, /DB_URL/);
    process.env.DB_URL = "mongodb://127.0.0.1/test";
    delete process.env.JWT_SECRET;
    assert.throws(validateEnvironment, /JWT_SECRET/);
    process.env.JWT_SECRET = "isolated-test-secret";
    assert.doesNotThrow(validateEnvironment);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

test("HTTP authentication, database outage, and recovery", { timeout: 180000 }, async () => {
  process.env.JWT_SECRET = "isolated-test-secret";
  const mongo = await MongoMemoryServer.create();
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const base = `http://127.0.0.1:${server.address().port}`;
  const signin = (body) => fetch(`${base}/api/v1/signin`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  try {
    assert.equal((await fetch(`${base}/health`)).status, 503);
    let response = await signin(credentials);
    assert.equal(response.status, 503);
    assert.match((await response.json()).msg, /Database temporarily unavailable/);
    assert.equal(response.headers.get("retry-after"), "10");

    await mongoose.connect(mongo.getUri());
    await UserModel.create({ name: "Auth Test", phone: "1234567890", email: credentials.email,
      password: await bcrypt.hash(credentials.password, 10) });
    assert.equal((await fetch(`${base}/health`)).status, 200);
    assert.equal((await signin({ email: "invalid", password: "x" })).status, 400);
    assert.equal((await signin({ ...credentials, email: "missing@pccoepune.org" })).status, 400);
    assert.equal((await signin({ ...credentials, password: "wrong-password" })).status, 401);
    response = await signin(credentials);
    assert.equal(response.status, 200);
    const login = await response.json();
    assert.equal(login.user.email, credentials.email);
    assert.equal(login.user.password, undefined);
    assert.equal(jwt.verify(login.token, process.env.JWT_SECRET).userId, login.user.id);
    response = await fetch(`${base}/api/v1/info`, { headers: { Authorization: `Bearer ${login.token}` } });
    assert.equal(response.status, 200);
    const info = await response.json();
    assert.equal(info.email, credentials.email);
    assert.equal(info.password, undefined);
    assert.equal((await fetch(`${base}/api/v1/info`)).status, 401);
    assert.equal((await fetch(`${base}/api/v1/info`, { headers: { Authorization: "Bearer invalid" } })).status, 401);
    for (const route of ["purchase/all", "found/all"]) {
      response = await fetch(`${base}/api/v1/${route}`, { headers: { Authorization: `Bearer ${login.token}` } });
      assert.equal(response.status, 200);
    }
    // Express must respond with JSON even if an unexpected async route error occurs.
    const findOne = UserModel.findOne;
    try {
      UserModel.findOne = async () => { throw new Error("private database details"); };
      response = await signin(credentials);
      assert.equal(response.status, 500);
      assert.deepEqual(await response.json(), { msg: "Something went wrong. Please try again." });
    } finally { UserModel.findOne = findOne; }
    await mongoose.disconnect();
    assert.equal((await signin(credentials)).status, 503);
    await mongoose.connect(mongo.getUri());
    assert.equal((await signin(credentials)).status, 200);
  } finally {
    await new Promise(resolve => server.close(resolve));
    await mongoose.disconnect();
    await mongo.stop();
  }
});

test("initial connection failure retries and recovers without restarting Node", { timeout: 180000 }, async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongo.stop({ doCleanup: false });
  const logs = [];
  const child = spawn(process.execPath, ["-e", `
    process.env.DB_URL = process.env.TEST_DB_URI;
    require('./dist/config/database').connectDatabase().then(async () => {
      console.log('RECOVERED');
      await require('mongoose').disconnect();
      process.exit(0);
    });
  `], { cwd: require("node:path").join(__dirname, ".."), env: { ...process.env, TEST_DB_URI: uri } });
  child.stdout.on("data", data => logs.push(data.toString()));
  child.stderr.on("data", data => logs.push(data.toString()));
  const exited = once(child, "exit");
  try {
    const deadline = Date.now() + 30000;
    while (!logs.join("").includes("retrying")) {
      assert.equal(child.exitCode, null, logs.join(""));
      assert.ok(Date.now() < deadline, "Expected initial failure to be caught");
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    await mongo.start();
    const [code] = await exited;
    assert.equal(code, 0, logs.join(""));
    assert.match(logs.join(""), /RECOVERED/);
  } finally { child.kill(); await mongo.stop(); }
});
