"use client";
import { toast } from "sonner";

export const apiClient = async <T>(
    url: string,
    options?: RequestInit
): Promise<T | null> => {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: "include",
        });

        const data: {
            data?: T;
            msg?: string;
            error?: string
        } = await response.json();

        if (!data.data && data?.error) {
            toast.error(`Error: ${data?.error}`);
            throw new Error(data?.error || "Something went wrong");
        }
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        if (data?.msg) {
            toast.success(data?.msg);
        }

        return data.data || null;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};
