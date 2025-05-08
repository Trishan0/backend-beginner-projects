import mongoose from 'mongoose';
import { CONFIG } from '../config'

export const connectDB = async ():Promise<void>=> {
    try {
        await mongoose.connect(CONFIG.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (e:unknown) {
        console.error('MongoDB connection error', e);
        process.exit(1);
    }
}
