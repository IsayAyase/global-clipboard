"use client";

import { apiClient } from "@/lib/apiClient";
import { ClipBoardPayloadType, IClipBoard } from "@/types/clipBoard";

export const createClipboard = async (
    payload: ClipBoardPayloadType,
    setLoading: (v: boolean) => void,
    setError: (msg: string | null) => void
) => {
    try {
        setLoading(true);

        const body = JSON.stringify(payload);

        const data = await apiClient<IClipBoard>("/api/clipboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        });

        return data;
    } catch (err) {
        console.error(err);
        setError("Something went wrong");
        return null;
    } finally {
        setLoading(false);
    }
};

export const getClipboard = async (
    code: string,
    setLoading: (v: boolean) => void,
    setError: (msg: string | null) => void
) => {
    try {
        setLoading(true);

        const data = await apiClient<IClipBoard>(`/api/cb?code=${code}`, {
            method: "GET",
        });

        return data;
    } catch (err) {
        console.error(err);
        setError("Failed to load clipboards");
        return null;
    } finally {
        setLoading(false);
    }
};

export const getAllClipboards = async (
    setLoading: (v: boolean) => void,
    setError: (msg: string | null) => void
) => {
    try {
        setLoading(true);

        const data = await apiClient<IClipBoard[]>("/api/clipboard", {
            method: "GET",
        });

        return data;
    } catch (err) {
        console.error(err);
        setError("Failed to load clipboards");
        return null;
    } finally {
        setLoading(false);
    }
};

export const deleteClipboard = async (
    code: string,
    setLoading: (v: boolean) => void,
    setError: (msg: string | null) => void
) => {
    try {
        setLoading(true);

        const data = await apiClient<{ success: boolean }>(
            `/api/clipboard?code=${code}`,
            {
                method: "DELETE",
            }
        );

        return data;
    } catch (err) {
        console.error(err);
        setError("Failed to delete clipboard");
        return null;
    } finally {
        setLoading(false);
    }
};

export const deleteAllClipboard = async (
    setLoading: (v: boolean) => void,
    setError: (msg: string | null) => void
) => {
    try {
        setLoading(true);

        const data = await apiClient<{ success: boolean }>(
            `/api/clipboard?all=true`,
            {
                method: "DELETE",
            }
        );

        return data;
    } catch (err) {
        console.error(err);
        setError("Failed to delete clipboard");
        return null;
    } finally {
        setLoading(false);
    }
};
