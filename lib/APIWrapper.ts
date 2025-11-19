import { CookiesName } from "@/constants/cookies";
import envvars from "@/constants/envvars";
import { IUser } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import APIResponseError from "./APIResponseError";
import connectDB from "./connectDB";

export type APIResponse = {
    statusCode: number;
    msg: string;
    data?: any;
    cookies?: {
        name: CookiesName;
        value: string;
        maxAge?: number;
    }[];
    headers?: Record<string, string>;
} | null;

/**
 * handles the database connection and api response error handling.
 * @param handler
 * @returns
 */
export default function APIWrapper(
    handler: (req: NextRequest, user?: IUser) => Promise<APIResponse>
): (req: NextRequest) => Promise<NextResponse | Response> {
    return async (req: NextRequest) => {
        try {
            await connectDB();
            const userString = req.headers.get("x-user");
            const user = userString ? JSON.parse(userString) : null;

            const output = await handler(req, user);
            const isContentTypeProvided = output?.headers?.["Content-Type"];
            if (isContentTypeProvided) {
                return new Response(output.data, {
                    status: output?.statusCode || 200,
                    headers: output?.headers,
                });
            }

            const res = NextResponse.json(output, {
                status: output?.statusCode || 200,
                headers: output?.headers,
            });
            if (output?.cookies) {
                output.cookies.forEach((cookie) => {
                    res.cookies.set(cookie.name, cookie.value, {
                        httpOnly: true,
                        secure: envvars.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge:
                            cookie.maxAge === undefined
                                ? 60 * 60 * 24 * 3
                                : cookie.maxAge, // 3 days
                    });
                });
            }

            return res;
        } catch (error: any) {
            if (error instanceof APIResponseError) {
                console.log("[API Error]", error.name, error.message);
                return NextResponse.json(
                    { error: error.message },
                    { status: error.statusCode }
                );
            } else {
                console.log(
                    "[Unhandled API Error]",
                    error?.name,
                    error?.message,
                    error?.cause
                );
                return NextResponse.json(
                    { error: "Something went wrong" },
                    { status: 500 }
                );
            }
        }
    };
}
