"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import Link from "next/link";

export default function CTABtn() {
    const { isAuthenticated } = useUserStore();
    return isAuthenticated ? (
        <Link href={"/clipboard"}>
            <Button>Your Clipboard</Button>
        </Link>
    ) : (
        <Link href={"/login"}>
            <Button>Login</Button>
        </Link>
    );
}
