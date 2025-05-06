import dotenv from 'dotenv';

dotenv.config()

interface Config {
    PORT: number;
    MONGODB_URI: string;
    JWT_SECRET: string;
}

export const CONFIG: Config = {
    PORT: Number(process.env.PORT) || 3000,
    MONGODB_URI: process.env.MONGODB_URI!,
    JWT_SECRET: process.env.JWT_SECRET!
}