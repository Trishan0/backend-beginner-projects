import mongoose, {Document, Schema, Model} from 'mongoose'

export interface ITodo extends Document {
    title: string;
    description: string;
    date?: Date;
    status: "pending" | "done" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}

const taskSchema: Schema<ITodo> = new Schema(
    {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['pending','done','cancelled'],
        default: 'pending'
    }
}, {timestamps: true});

export const Todo:Model<ITodo> = mongoose.model<ITodo>("Task", taskSchema);