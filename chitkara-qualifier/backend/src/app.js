import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import healthRoutes from "./routes/health.routes.js";
import bfhlRoutes from "./routes/bfhl.routes.js";
import { notFoundHandler } from "./middleware/notfound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(morgan("tiny"));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false
  })
);
app.use(express.json({ limit: "64kb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use("/health", healthRoutes);
app.use("/bfhl", bfhlRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
