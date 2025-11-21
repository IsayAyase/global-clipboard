import envvars from "@/constants/envvars";
import { IClipBoard } from "@/types/clipBoard";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
    url: envvars.REDIS_URL,
    token: envvars.REDIS_TOKEN,
});

async function setClip(
    key: string,
    value: IClipBoard
): Promise<IClipBoard | null> {
    try {
        const redisKey = `clipboard:${key}`;
        const result = await redis.set<IClipBoard>(redisKey, value, {
            ex: 600, // 10 min
        });
        return result as IClipBoard | null;
    } catch (error) {
        console.log("[REDIS ERROR]:", error);
        return null;
    }
}

async function getClip(key: string): Promise<IClipBoard | null> {
    try {
        const redisKey = `clipboard:${key}`;
        const result = await redis.get<IClipBoard>(redisKey);
        return result;
    } catch (error) {
        console.log("[REDIS ERROR]:", error);
        return null;
    }
}

async function deleteClip(key: string) {
    try {
        const redisKey = `clipboard:${key}`;
        const result = await redis.del(redisKey);
        return result;
    } catch (error) {
        console.log("[REDIS ERROR]:", error);
        return null;
    }
}

const redisCaching = { setClip, getClip, deleteClip };
export default redisCaching;
