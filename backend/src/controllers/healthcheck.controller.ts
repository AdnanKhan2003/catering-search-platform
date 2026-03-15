import type { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import { APIResponse } from "../lib/APIResponse.js";
import { OK } from "../lib/http.js";
import { logger } from "../lib/logger.js";

const healthcheck = asyncHandler(async (req: Request, res: Response) => {
    logger.info("Healthcheck request received");
    return res.status(OK).json(
        new APIResponse(OK, { status: "UP" }, "Healthcheck successful")
    );
});

export { healthcheck };
