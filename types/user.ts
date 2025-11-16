import mongoose from "mongoose";

export interface IUser {
    _id: string | mongoose.Types.ObjectId;
    id: string;
    name: string;
    email: string;
    isActive?: boolean;
    lastLogin?: Date;
}

