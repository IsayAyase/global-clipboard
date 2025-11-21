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
    "/cb",
];

const baseUrl = envvars.APP_URL;

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
    redis: new Redis({
        url: envvars.REDIS_URL,
        token: envvars.REDIS_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(5, "20 s"), // 5 req per 20 s
    prefix: "ratelimit",
});

async function handleLimiter(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown_ip";
    const { success } = await ratelimit.limit(ip);
    return { success, ip };
}

export async function proxy(request: NextRequest) {
    try {
        const { success, ip } = await handleLimiter(request);
        if (!success) {
            console.log(`[RATELIMIT]: ${ip} blocked`);
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }
    } catch (error) {
        console.log("[RATELIMIT Error]:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }

    const pathname = request.nextUrl.pathname;
    const redirectUrl = NextResponse.redirect(
        `${baseUrl}/login?pathname=${pathname}`
    );

    // loose check
    let redirectSkip = false;
    for (const endpoint of endpointsToSkipRedirect) {
        if (endpoint.startsWith(pathname)) {
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
    matcher: ["/api/:path*", "/clipboard/:path*", "/cb/:path*"],
};
