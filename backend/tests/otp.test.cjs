const { test } = require("node:test");
const assert = require("node:assert/strict");
const { transporter, getOtpSender } = require("../dist/utils/mailer");
const { sendOtp, otpStore } = require("../dist/controllers/registerControllers/sendOtp");

function response() {
  return { code: 200, body: null, status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; } };
}

test("OTP uses a verified sender separately from the SMTP login and stores only sent codes", async () => {
  const previous = { EMAIL_FROM: process.env.EMAIL_FROM, EMAIL_USER: process.env.EMAIL_USER };
  const originalSend = transporter.sendMail;
  const email = "otp-test@pccoepune.org";
  try {
    process.env.EMAIL_USER = "account@smtp-brevo.com";
    delete process.env.EMAIL_FROM;
    assert.throws(getOtpSender, /EMAIL_FROM/);
    process.env.EMAIL_FROM = "verified@example.com";
    let sent;
    transporter.sendMail = async message => { sent = message; return {}; };
    let res = response();
    await sendOtp({ body: { email } }, res);
    assert.equal(res.code, 200);
    assert.deepEqual(sent.from, { name: "PCCOE Mart", address: "verified@example.com" });
    assert.equal(sent.to, email);
    const saved = otpStore.get(email);
    assert.match(saved.otp, /^\d{6}$/);
    assert.ok(sent.text.includes(saved.otp));
    assert.ok(saved.expiresAt > Date.now());

    otpStore.delete(email);
    transporter.sendMail = async () => { throw Object.assign(new Error("private SMTP details"), { code: "EAUTH", responseCode: 535 }); };
    res = response();
    await sendOtp({ body: { email } }, res);
    assert.equal(res.code, 500);
    assert.equal(otpStore.has(email), false);
    assert.deepEqual(res.body, { msg: "Failed to send OTP email." });

    for (const value of [undefined, 1234, "wrong@@pccoepune.org", "outsider@example.com"]) {
      res = response();
      await sendOtp({ body: { email: value } }, res);
      assert.equal(res.code, 400);
    }
    delete process.env.EMAIL_FROM;
    process.env.EMAIL_USER = "legacy-sender@example.com";
    assert.equal(getOtpSender().address, "legacy-sender@example.com");
  } finally {
    transporter.sendMail = originalSend;
    otpStore.delete(email);
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  }
});
