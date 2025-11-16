import mongoose from "mongoose";
import type { IClipBoard } from "../types/clipBoard";

const clipBoardSchema = new mongoose.Schema<IClipBoard>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        text: {
            type: String,
        },
        fileUrl: {
            type: String,
        },
        access: {
            type: String,
            required: true,
        },
        enableCurl: {
            type: Boolean,
            default: false,
        },
        enableOneFetch: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        expireAfterSeconds: 60 * 60, // 1 hour
    }
);

export default (mongoose.models?.ClipBoard as mongoose.Model<IClipBoard>) ||
    mongoose.model<IClipBoard>("ClipBoard", clipBoardSchema);
