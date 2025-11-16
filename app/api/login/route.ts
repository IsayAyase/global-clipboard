import envvars from "@/constants/envvars";
import APIResponseError from "@/lib/APIResponseError";
import APIWrapper from "@/lib/APIWrapper";
import { generateAuthToken } from "@/lib/authToken";
import oAuthClient from "@/lib/oAuthClient";
import User from "@/models/User";
import { NextRequest } from "next/server";

export const POST = APIWrapper(async (request: NextRequest) => {
    const body = await request.json();
    const { googleAuthCred } = body;
    if (!googleAuthCred) {
        throw new APIResponseError("Invalid token", 400);
    }

    const ticket = await oAuthClient.verifyIdToken({
        idToken: googleAuthCred,
        audience: envvars.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
        throw new APIResponseError("Invalid token", 400);
    }

    let user = null;
    const findingUser = await User.findOne({ email: payload.email });
    if (!findingUser && payload.email) {
        user = new User({
            email: payload.email,
            name: payload.name,
            isActive: true,
            lastLogin: new Date(),
        });
        await user.save();
    } else {
        user = findingUser;
        await User.findOneAndUpdate(
            { email: payload.email },
            { lastLogin: new Date() }
        );
    }

    if (!user) {
        throw new APIResponseError("Something went wrong", 500);
    }

    const token = generateAuthToken({
        _id: user._id,
        id: user.id,
        email: user.email,
        name: user.name,
        lastLogin: user.lastLogin,
        isActive: user.isActive,
    });
    return {
        statusCode: 200,
        msg: "Success",
        data: user,
        cookies: [{ name: "auth_token", value: token }],
    };
});
