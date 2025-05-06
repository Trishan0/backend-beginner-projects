import mongoose, {Document, Schema, Model} from 'mongoose'

export interface ITask extends Document {
    taskName: string;
    description: string;
    date?: Date;
    status: "pending" | "done" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}

const taskSchema: Schema<ITask> = new Schema(
    {
    taskName: {
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

export const Task:Model<ITask> = mongoose.model<ITask>("Task", taskSchema);