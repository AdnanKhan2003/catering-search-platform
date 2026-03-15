import type { Request, Response, NextFunction } from "express";
import { APIError } from "../lib/APIError.js";
import { logger } from "../lib/logger.js";
import { INTERNAL_SERVER_ERROR } from "../lib/http.js";

interface ErrorWithStatus extends Error {
    statusCode?: number;
    errors?: unknown[];
}

const errorMiddleware = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode;
    let message = err.message;

    if (!(err instanceof APIError)) {
        statusCode = INTERNAL_SERVER_ERROR;
        message = "Internal Server Error";
        logger.error(err.message || "Unknown error occurred", { stack: err.stack });
    }

    res.status(statusCode || INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || INTERNAL_SERVER_ERROR,
        message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export { errorMiddleware };
