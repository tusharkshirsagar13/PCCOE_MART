import "dotenv/config";
import { app } from "./app";
import { connectDatabase, validateEnvironment } from "./config/database";

try {
  validateEnvironment();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // Keep the HTTP server available to report readiness while Atlas recovers.
    void connectDatabase();
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : "Invalid configuration");
  process.exitCode = 1;
}
