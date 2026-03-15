import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key] || defaultValue;

    if (!value) throw new Error(`Can't find value for key ${key}`);

    return value;
};

const PORT = getEnv('PORT', '5000');
const MONGO_URI = getEnv('MONGO_URI');
const NODE_ENV = getEnv('NODE_ENV');

export {
    PORT,
    MONGO_URI,
    NODE_ENV
};