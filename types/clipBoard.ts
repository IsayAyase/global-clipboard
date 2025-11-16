import mongoose from "mongoose";
import { IUser } from "./user";

export type ClipBoardAccess = "PUBLIC" | "PRIVATE";

export interface IClipBoard {
    _id: string | mongoose.Types.ObjectId;
    id: string;
    userId: string | mongoose.Types.ObjectId;
    code: string;
    text?: string;
    fileUrl?: string;
    access: ClipBoardAccess;
    enableCurl: boolean;
    enableOneFetch: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IClipBoardPopulated extends IClipBoard {
    user: IUser | null;
}

export type ClipBoardPayloadType = Pick<
    IClipBoard,
    "text" | "fileUrl" | "access" | "enableCurl" | "enableOneFetch"
>;
