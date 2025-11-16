import mongoose from "mongoose";
import type { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100,
            minlength: 3,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models?.User as mongoose.Model<IUser>) ||
    mongoose.model<IUser>("User", userSchema);
