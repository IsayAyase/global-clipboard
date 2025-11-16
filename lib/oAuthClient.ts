import envvars from "@/constants/envvars";
import { OAuth2Client } from "google-auth-library";

const oAuthClient = new OAuth2Client(envvars.GOOGLE_CLIENT_ID);

export default oAuthClient;
