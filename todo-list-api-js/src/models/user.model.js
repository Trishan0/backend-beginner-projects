import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    }, {timestamps: true}
);

export const User = new mongoose.model('User', userSchema);