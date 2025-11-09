import "../instrument.mjs";
import express from "express";
import { ENV } from "./config/env.js";
import { connecDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();

const url =
  ENV.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://sign-detection.vercel.app";

app.use(cors({ origin: url, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("health-test");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connecDB();
    app.listen(ENV.PORT, () => {
      console.log("Server started on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export default app;
