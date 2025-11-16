import { Button } from "@/components/ui/button";
import { useClipBoardStore } from "@/store/clipBoard";
import { useUserStore } from "@/store/user";
import { LoaderCircle, Trash } from "lucide-react";
import { useState } from "react";
import { deleteClipboard } from "../../apiCalls";

export default function DeleteFromClipBoardBtn({
    code,
    className,
}: {
    code: string;
    className?: string;
}) {
    const { isAuthenticated } = useUserStore();
    const { setError, deleteData } = useClipBoardStore();

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const res = await deleteClipboard(code, setLoading, setError);
        if (res?.success) {
            deleteData(code);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Button
            className={className}
            onClick={handleDelete}
            variant={"ghost"}
            size={"icon-sm"}
            disabled={loading}
        >
            {loading ? <LoaderCircle className="animate-spin" /> : <Trash />}
        </Button>
    );
}
