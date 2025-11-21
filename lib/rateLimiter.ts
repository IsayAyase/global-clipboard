import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest } from "next/server";
import { redis } from "./redisCaching";

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "30 s"), // 10 req per 30 s
    prefix: "ratelimit",
});

export async function handleLimiter(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown_ip";
    const { success } = await ratelimit.limit(ip);
    return { success, ip };
}
