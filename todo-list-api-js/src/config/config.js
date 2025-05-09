import dotenv from 'dotenv';

dotenv.config()

export const CONFIG = {
    PORT:process.env.PORT || 3000,
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY
}