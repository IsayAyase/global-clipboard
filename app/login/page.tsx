import OAuthGoogleBtn from "@/components/OAuthGoogleBtn";
import envvars from "@/constants/envvars";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Page() {
    return (
        <GoogleOAuthProvider clientId={envvars.GOOGLE_CLIENT_ID}>
            <OAuthGoogleBtn />
        </GoogleOAuthProvider>
    );
}
