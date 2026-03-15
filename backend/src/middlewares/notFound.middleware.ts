import type { NextFunction, Request, Response } from "express";
import { NOT_FOUND } from "../lib/http.js";
import { APIError } from "../lib/APIError.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { logger } from "../lib/logger.js";

const notFoundHandler = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    logger.error(`404 - Not Found: ${req.originalUrl}`);
    throw new APIError(NOT_FOUND, `Path ${req.originalUrl} Doesn't Exist, Maybe there's some Typo`);
});

export { notFoundHandler };
