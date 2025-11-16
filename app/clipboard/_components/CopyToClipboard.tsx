"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export async function copyToClipboardFunc(
    text: string,
    setLoading?: Dispatch<SetStateAction<boolean>>,
    toast?: any,
    msg?: string,
    errorMsg?: string
) {
    if (text.trim().length === 0) return;
    if (setLoading) setLoading(true);
    try {
        await navigator.clipboard.writeText(text);
        toast?.success(msg || "Copied to clipboard!");
        console.log("Text copied to clipboard");
    } catch (error) {
        toast?.error(errorMsg || "Failed to copy to clipboard");
        console.error("Error copying to clipboard:", error);
    }
    if (setLoading) setLoading(false);
}

export default function CopyToClipboard({ text }: { text: string }) {
    const [loading, setLoading] = useState(false);
    function copy() {
        if (loading) return;
        copyToClipboardFunc(text, setLoading, toast);
    }

    return (
        <Button
            variant={"ghost"}
            size={"icon-sm"}
            disabled={loading}
            onClick={copy}
        >
            <Copy />
        </Button>
    );
}
