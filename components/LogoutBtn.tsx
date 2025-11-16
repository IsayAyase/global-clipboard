"use client";

import { apiClient } from "@/lib/apiClient";
import { useUserStore } from "@/store/user";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

export const handleLogout = async (
    setLoading: Dispatch<SetStateAction<boolean>>
) => {
    setLoading(true);
    try {
        const data = await apiClient<{ success: boolean }>("/api/logout", {
            method: "POST",
        });

        if (data?.success) {
            window.location.href = "/";
        }
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
};

export default function LogoutBtn({ className }: { className?: string }) {
    const { isAuthenticated } = useUserStore();
    const [loading, setLoading] = useState(false);

    if (!isAuthenticated) return null;

    return (
        <Button
            disabled={loading}
            onClick={() => handleLogout(setLoading)}
            className={className}
        >
            Logout
        </Button>
    );
}
