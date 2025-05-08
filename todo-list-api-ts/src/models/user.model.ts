import mongoose, {Document, Schema, Model} from 'mongoose'

export interface IUser extends Document {
    name:string,
    email:string,
    password:string
}

const userSchema: Schema<IUser> = new Schema(
    {
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
)

export const User:Model<IUser> = mongoose.model<IUser>("User", userSchema);