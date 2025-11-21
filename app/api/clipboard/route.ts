import APIResponseError from "@/lib/APIResponseError";
import APIWrapper from "@/lib/APIWrapper";
import redisCaching from "@/lib/redisCaching";
import ClipBoard from "@/models/ClipBoard";
import { ClipBoardPayloadType } from "@/types/clipBoard";
import { IUser } from "@/types/user";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const generateCode = (length: number = 4) => {
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
};

export const POST = APIWrapper(async (request: NextRequest, user?: IUser) => {
    const body: ClipBoardPayloadType = await request.json();

    // body validation
    let error: string | null = null;
    if (!body.text) {
        error = "Text not provided";
    } else if (body.access !== "PRIVATE" && body.access !== "PUBLIC") {
        error = "Invalid access";
    } else if (body.enableCurl) {
        if (!body.text) {
            error = "Curl is only available for text only";
        } else if (body.access !== "PUBLIC") {
            error = "Curl is only available for public access";
        }
    } else if (body.text.trim().length > 5000) {
        error = "Text is too long, max limit 5000 characters";
    }

    if (error) throw new APIResponseError(error, 400);

    // handling code generation
    let code = generateCode();
    let cb = await ClipBoard.findOne({ code });
    let tries = 0;
    while (cb) {
        code = generateCode();
        cb = await ClipBoard.findOne({ code });
        tries++;
        console.log("[API]: Generating Code fof CB Tries: ", tries);
        if (tries === 5) {
            throw new APIResponseError("Failed to generate code", 500);
        }
    }

    const newCB = new ClipBoard({
        code: code,
        text: body.text?.trim(),
        fileUrl: body.fileUrl,
        access: body.access,
        enableCurl: body.enableCurl,
        enableOneFetch: body.enableOneFetch,
        userId: user?._id,
    });
    await newCB.save();

    await redisCaching.setClip(code, newCB);

    return {
        statusCode: 200,
        msg: "Added in the clipboard!",
        data: newCB,
    };
});

export const GET = APIWrapper(async (request: NextRequest, user?: IUser) => {
    // get all
    const allCB = await ClipBoard.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(user?._id),
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);
    return {
        statusCode: 200,
        msg: "",
        data: allCB,
    };
});

export const DELETE = APIWrapper(async (request: NextRequest, user?: IUser) => {
    const code = request.nextUrl.searchParams.get("code");
    const all = request.nextUrl.searchParams.get("all");
    if (!code && !all) {
        throw new APIResponseError("Code not provided", 400);
    }

    if (all) {
        await ClipBoard.deleteMany({
            userId: new mongoose.Types.ObjectId(user?._id),
        });
        return {
            statusCode: 200,
            msg: "Disapeared like they'll never existed!",
            data: {
                success: true,
            },
        };
    }

    const cb = await ClipBoard.findOneAndDelete({
        code,
        userId: new mongoose.Types.ObjectId(user?._id),
    });
    if (!cb) {
        throw new APIResponseError("Invalid code", 400);
    }

    if (code) await redisCaching.deleteClip(code);

    return {
        statusCode: 200,
        msg: "Disapeared like it never existed!",
        data: {
            success: true,
        },
    };
});
