"use client";

import { apiClient } from "@/lib/apiClient";
import { useUserStore } from "@/store/user";
import { IUser } from "@/types/user";
import { useEffect } from "react";

export const LoadUserState = () => {
    const { setData, setLoading } = useUserStore();

    useEffect(() => {
        const verify = async () => {
            setLoading(true);
            try {
                const user = await apiClient<IUser>("/api/verify", {
                    credentials: "include",
                });
                if (user) setData(user);
            } catch (error) {
                console.error(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, []);

    return <></>;
};
