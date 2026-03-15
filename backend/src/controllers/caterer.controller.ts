import type { Request, Response } from "express";
import { Caterer } from "../models/caterer.model.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { APIResponse } from "../lib/APIResponse.js";
import { APIError } from "../lib/APIError.js";
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../lib/http.js";
import { logger } from "../lib/logger.js";

const getCaterers = asyncHandler(async (req: Request, res: Response) => {
    const caterers = await Caterer.find({});
    logger.info("Caterers fetched successfully");

    return res.status(OK).json(
        new APIResponse(OK, caterers, "Caterers fetched successfully")
    );
});

const getCatererById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const caterer = await Caterer.findById(id);

    if (!caterer) {
        logger.error(`Caterer with ID ${id} not found`);
        throw new APIError(NOT_FOUND, "Caterer not found");
    }

    logger.info(`Caterer with ID ${id} fetched successfully`);
    return res.status(OK).json(
        new APIResponse(OK, caterer, "Caterer fetched successfully")
    );
});

const createCaterer = asyncHandler(async (req: Request, res: Response) => {
    const { name, location, pricePerPlate, cuisines, rating } = req.body;

    if (!name || !location || pricePerPlate === undefined || !cuisines) {
        logger.error("Failed to create caterer: Missing required fields");
        throw new APIError(BAD_REQUEST, "Missing required fields");
    }

    if (!Array.isArray(cuisines)) {
        logger.error("Failed to create caterer: Cuisines must be an array");
        throw new APIError(BAD_REQUEST, "Cuisines must be an array");
    }

    const caterer = await Caterer.create({
        name,
        location,
        pricePerPlate,
        cuisines,
        rating: rating || 0
    });

    logger.info(`Caterer ${name} created successfully with ID ${caterer._id}`);
    return res.status(CREATED).json(
        new APIResponse(CREATED, caterer, "Caterer created successfully")
    );
});

export { getCaterers, getCatererById, createCaterer };
