import mongoose from "mongoose";
import {CONFIG} from "../config/config.js";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(CONFIG.MONGODB_URI)
    } catch (e) {
        console.error("MongoDB Connection Error ! ", e)
        process.exit(1)
    }
}