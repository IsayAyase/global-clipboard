import APIWrapper from "@/lib/APIWrapper";

export const POST = APIWrapper(async () => {
    return {
        statusCode: 200,
        msg: "Success",
        data: {
            success: true,
        },
        cookies: [
            {
                name: "auth_token",
                value: "be free, you shit!!!",
                maxAge: 1, // makes cookie expire immediately
            },
        ],
    };
});
