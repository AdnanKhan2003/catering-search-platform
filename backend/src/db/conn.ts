import mongoose from "mongoose";
import { MONGO_URI } from "../lib/env.js";
import { logger } from "../lib/logger.js";

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGO_URI);
        logger.info(`MongoDB connection successful: ${connectionInstance.connection.host}`)
    } catch (err: unknown) {
        logger.error(`Error connecting to db: ${(err as Error).message}`)
    }
};

export { connectToDb };