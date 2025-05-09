import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date : { type: Date, default: Date.now },

}, { timestamps: true });

export const Todo = new mongoose.model('Todo', todoSchema);
