const envvars = {
  NODE_ENV: process.env.NODE_ENV as "development" | "production",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  MONGODB_URI: process.env.MONGODB_URI as string,

  JWT_SECRET: process.env.JWT_SECRET as string,

  NEXT_URL: process.env.NEXT_PUBLIC_NEXT_URL as string,
};

export default envvars;
