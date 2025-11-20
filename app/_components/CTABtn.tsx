"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABtn() {
    const { isAuthenticated } = useUserStore();
    return isAuthenticated ? (
        <Link href={"/clipboard"}>
            <Button>
                <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "fit-content" }}
                    transition={{ duration: 1 }}
                    className="truncate"
                >
                    Your Clipboard
                </motion.span>
            </Button>
        </Link>
    ) : (
        <Link href={"/login"}>
            <Button>Login</Button>
        </Link>
    );
}
