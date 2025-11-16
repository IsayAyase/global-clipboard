import envvars from "@/constants/envvars";
import { IUser } from "@/types/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import APIResponseError from "./APIResponseError";

const JWT_SECRET = envvars.JWT_SECRET as string;

export const generateAuthToken = (user: IUser) => {
    const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: "3d",
    });
    return token;
};

export const getAuthToken = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (typeof decoded === "string" || !decoded?.id || !decoded?.email) {
        throw new APIResponseError("", 401);
    }

    return decoded as JwtPayload;
};
