"use client";
import { getClipboard } from "@/app/apiCalls";
import {
    ClipBoardItem,
    ClipBoardItemLoading,
} from "@/app/clipboard/_components/ListClipBoard";
import { IClipBoard } from "@/types/clipBoard";
import { useEffect, useState } from "react";

export default function Element({ code }: { code: string }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cbData, setCbData] = useState<IClipBoard | null>(null);

    useEffect(() => {
        getClipboard(code, setLoading, setError).then((data) => {
            setCbData(data);
        });
    }, []);

    return (
        <>
            {loading ? (
                <ClipBoardItemLoading />
            ) : !cbData ? (
                <div></div>
            ) : (
                <ClipBoardItem item={cbData} />
            )}
        </>
    );
}
