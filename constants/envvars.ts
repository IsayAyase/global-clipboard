const envvars = {
    NODE_ENV: process.env.NODE_ENV as "development" | "production",

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    MONGODB_URI: process.env.MONGODB_URI as string,

    JWT_SECRET: process.env.JWT_SECRET as string,

    APP_URL:
        (process.env.NODE_ENV as "development" | "production") === "development"
            ? "http://localhost:3000"
            : (process.env.NEXT_PUBLIC_APP_URL as string) ||
              "http://localhost:3000",

    REDIS_URL: process.env.REDIS_URL as string,
    REDIS_TOKEN: process.env.REDIS_TOKEN as string,
};

export default envvars;
