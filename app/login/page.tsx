import OAuthGoogleBtn from "@/components/OAuthGoogleBtn";
import envvars from "@/constants/envvars";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export default function Page() {
    return (
        <div className="h-full">
            <GoogleOAuthProvider clientId={envvars.GOOGLE_CLIENT_ID}>
                <div className="p-2 space-y-2 rounded-xl my-20 mx-auto max-w-md w-full">
                    <div className="relative">
                        <Image
                            src={"/login-thumbnail.jpg"}
                            alt="login thumbnail image"
                            width={640}
                            height={360}
                            className="object-cover w-full h-full rounded-md"
                        />
                        <span className="text-white text-2xl font-semibold absolute bottom-14 left-20">
                            *ClipB
                        </span>
                    </div>
                    <Suspense
                        fallback={<Loader className="size-5 animate-spin" />}
                    >
                        <OAuthGoogleBtn />
                    </Suspense>
                </div>
            </GoogleOAuthProvider>
        </div>
    );
}
