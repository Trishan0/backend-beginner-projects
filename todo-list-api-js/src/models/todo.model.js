import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';
import {CONFIG} from "../config/config.js";

const connection = mongoose.createConnection(CONFIG.MONGODB_URI);
const AutoIncrement = AutoIncrementFactory(connection);
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

todoSchema.plugin(AutoIncrement, { inc_field: 'id' });
export const Todo = new mongoose.model('Todo', todoSchema);
