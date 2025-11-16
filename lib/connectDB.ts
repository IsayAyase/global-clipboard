import envvars from "@/constants/envvars";
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("[DB INFO]: using cached connection");
        return;
    }

    const MONGO_URI = envvars.MONGODB_URI;
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    }

    const conn = await mongoose.connect(MONGO_URI as string, {
        dbName: "global-clipboard",
    });
    console.log("[DB INFO]: new connection created");
    isConnected = conn.connections[0].readyState === 1;
};

export default connectDB;
