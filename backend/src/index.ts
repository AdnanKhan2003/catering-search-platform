import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { PORT } from "./lib/env.js";
import { connectToDb } from "./db/conn.js";
import { logger } from "./lib/logger.js";
import { corsConfig } from "./lib/corsConfig.js";

import catererRoutes from "./routes/caterer.routes.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";

const app = express();

app.use(cors(corsConfig));
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/caterers", catererRoutes);
app.use("/api/healthcheck", healthcheckRoutes);

app.use(notFoundHandler);
app.use(errorMiddleware);

process.on("unhandledRejection", (err: Error) => {
  logger.error("Unhandled Rejection. Shutting down!");
  logger.error(err.name, err.message);
  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught Exception. Shutting down!");
  logger.error(err.name, err.message);
  process.exit(1);
});

connectToDb()
  .then(() =>
    app.listen(PORT, () => logger.info(`Server is running at Port: ${PORT}`))
  )
  .catch(() => logger.error('Failed to connect to DB'));