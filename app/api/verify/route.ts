import APIWrapper from "@/lib/APIWrapper";
import { IUser } from "@/types/user";
import { NextRequest } from "next/server";

export const GET = APIWrapper(async (request: NextRequest, user?: IUser) => {
    return {
        statusCode: 200,
        msg: user ? "Login successful!" : "",
        data: user,
    };
});
