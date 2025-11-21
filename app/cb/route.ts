import APIResponseError from "@/lib/APIResponseError";
import APIWrapper from "@/lib/APIWrapper";
import redisCaching from "@/lib/redisCaching";
import ClipBoard from "@/models/ClipBoard";
import { IUser } from "@/types/user";
import { NextRequest } from "next/server";

export const GET = APIWrapper(async (request: NextRequest, user?: IUser) => {
    const code = request.nextUrl.searchParams.get("code");
    const mode = request.nextUrl.searchParams.get("mode");
    if (!code) {
        throw new APIResponseError("Missing code", 400);
    }

    let cb = null;
    cb = await redisCaching.getClip(code);
    if (cb) {
        cb = await ClipBoard.findOne({ code });
        if (cb) {
            await redisCaching.setClip(code, cb);
        }
    }
    if (!cb) {
        throw new APIResponseError("Invalid code", 404);
    }

    if (
        cb.access === "PRIVATE" &&
        cb.userId.toString() !== user?._id.toString()
    ) {
        throw new APIResponseError("Unauthorized", 401);
    }

    // handle fetch one
    if (cb.enableOneFetch) {
        await ClipBoard.findOneAndDelete({ code });
    }

    if (mode === "api") {
        return {
            statusCode: 200,
            msg: "",
            data: cb,
        };
    } else if (cb.enableCurl) {
        return {
            data: cb.text,
            statusCode: 200,
            msg: "",
            headers: {
                "Content-Type": "text/plain",
            },
        };
    } else {
        throw new APIResponseError("Invalid mode", 400);
    }
});
