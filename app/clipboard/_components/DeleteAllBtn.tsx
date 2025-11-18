"use client";

import { Button } from "@/components/ui/button";
import { useClipBoardStore } from "@/store/clipBoard";
import { LoaderCircle, Trash } from "lucide-react";
import { useState } from "react";
import { deleteAllClipboard } from "../../apiCalls";

export default function DeleteAllBtn({ className }: { className?: string }) {
    const { setError, setData } = useClipBoardStore();

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const res = await deleteAllClipboard(setLoading, setError);
        if (res?.success) {
            setData([]);
        }
    };

    return (
        <Button
            className={className}
            onClick={handleDelete}
            variant={"destructive"}
            disabled={loading}
            size={"sm"}
        >
            {loading ? <LoaderCircle className="animate-spin" /> : <Trash />}
            <span>Delete All</span>
        </Button>
    );
}
