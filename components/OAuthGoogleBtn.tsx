"use client";

import { apiClient } from "@/lib/apiClient";
import { useUserStore } from "@/store/user";
import { IUser } from "@/types/user";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function OAuthGoogleBtn() {
    const { setData, setLoading, setError, loading, data } = useUserStore();
    const route = useRouter();
    const params = useSearchParams();

    const googleBtnRef = useRef<HTMLDivElement>(null);
    const handleGoogleLogin = async (credentialRes: any) => {
        try {
            setLoading(true);
            const { credential } = credentialRes;
            const body = JSON.stringify({ googleAuthCred: credential });
            const data = await apiClient<IUser>("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });

            if (data) {
                setData(data);
                const pathname = params.get("pathname") || "/";
                route.push(pathname);
            } else {
                console.error(data);
                setError("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data) {
            const pathname = params.get("pathname") || "/";
            route.push(pathname);
        }
    }, [data]);

    const handleCtkBtn = () => {
        // clicking the google login button
        googleBtnRef.current?.getElementsByTagName("div")?.[3].click();
    };

    return (
        <>
            <span ref={googleBtnRef} style={{ display: "none" }}>
                <GoogleLogin
                    onSuccess={(credentialRes) =>
                        handleGoogleLogin(credentialRes)
                    }
                    onError={() => toast.error("Something went wrong")}
                />
            </span>
            <Button
                onClick={handleCtkBtn}
                disabled={loading || data !== null}
                type="button"
                className="mt-2 px-4 flex items-center justify-center gap-1"
            >
                <IoLogoGoogle />
                <span>Login with Google</span>
            </Button>
        </>
    );
}
