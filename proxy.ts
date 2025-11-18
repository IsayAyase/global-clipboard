import { cookiesName } from "@/constants/cookies";
import { getAuthToken } from "@/lib/authToken";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import envvars from "./constants/envvars";
import connectDB from "./lib/connectDB";

const endpointsToSkipRedirect = [
    "/api/login",
    "/api/logout",
    "/api/verify",
    "/api/cb",
    "/api/clipboard",
];

const baseUrl = envvars.NEXT_URL;

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const redirectUrl = NextResponse.redirect(
        `${baseUrl}/login?pathname=${pathname}`
    );

    let redirectSkip = false;
    for (const endpoint of endpointsToSkipRedirect) {
        if (endpoint.includes(pathname)) {
            redirectSkip = true;
            break;
        }
    }

    try {
        const authToken = request.cookies.get(cookiesName.AUTH_TOKEN);
        if (!authToken) {
            return redirectSkip ? NextResponse.next() : redirectUrl;
        }

        const userToken = getAuthToken(authToken.value);
        if (!userToken) {
            return redirectSkip ? NextResponse.next() : redirectUrl;
        }

        // ensure database connection
        await connectDB();
        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userToken._id),
        });
        if (!user) {
            return redirectSkip ? NextResponse.next() : redirectUrl;
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user", JSON.stringify(user));

        // Forward the request with the new headers
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        console.log(request.nextUrl.basePath);
        return redirectUrl;
    }
}

export const config = {
    matcher: ["/api/:path*", "/clipboard/:path*"],
};
