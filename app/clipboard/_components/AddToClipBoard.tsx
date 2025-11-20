"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useClipBoardStore } from "@/store/clipBoard";
import { useUserStore } from "@/store/user";
import { ClipBoardAccess, IClipBoard } from "@/types/clipBoard";
import {
    Earth,
    EarthLock,
    LoaderCircle,
    Lock,
    LockOpen,
    Plus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PiNumberCircleOne, PiNumberCircleOneFill } from "react-icons/pi";
import { toast } from "sonner";
import { createClipboard } from "../../apiCalls";
import { ClipBoardItem } from "./ListClipBoard";

export default function AddToClipBoard({
    showLinkWhenAdded = false,
}: {
    showLinkWhenAdded?: boolean;
}) {
    const { isAuthenticated } = useUserStore();
    const { addData, setError, error } = useClipBoardStore();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [access, setAccess] = useState<ClipBoardAccess>("PUBLIC");
    const [enableCurl, setEnableCurl] = useState(false);
    const [enableOneFetch, setEnableOneFetch] = useState(false);

    const [savedData, setSavedData] = useState<IClipBoard | null>(null);

    const textInputRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (e?: any) => {
        if (e) e.preventDefault();

        if (loading) return;
        setSavedData(null);

        // valibating...
        const trimedtext = text.trim();
        if (trimedtext === "") {
            setError("Text can't be empty");
            return;
        } else if (!isAuthenticated && access === "PRIVATE") {
            setError("Can't create private clipboard. You are not logged in!");
            return;
        } else if (enableCurl && access !== "PUBLIC") {
            setError("Can't enable curl for private clipboard!");
            return;
        } else if (trimedtext.length > 5000) {
            setError("Text can't be more than 5000 characters!");
            return;
        }

        // sending...
        const resData = await createClipboard(
            {
                text,
                access,
                enableCurl,
                enableOneFetch,
            },
            setLoading,
            setError
        );

        if (resData) {
            setSavedData(resData);
            addData(resData);
            setText("");
        }
    };

    useEffect(() => {
        if (error)
            toast.error(error, {
                onDismiss: () => setError(null),
                onAutoClose: () => setError(null),
            });
    }, [error]);

    useEffect(() => {
        if (loading) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                !loading &&
                textInputRef.current &&
                textInputRef.current === document.activeElement &&
                textInputRef.current?.value.trim() !== "" &&
                event.key === "Enter" &&
                event.ctrlKey
            ) {
                handleSubmit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [text, access, enableCurl, enableOneFetch, loading]);

    return (
        <Card className="">
            <CardTitle className="text-lg px-6">Add to Clipboard</CardTitle>
            <CardContent className="space-y-4">
                <form
                    autoFocus
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full"
                >
                    <Textarea
                        autoFocus
                        ref={textInputRef}
                        name="text"
                        placeholder="Type something. (Ctrl + Enter to Add!)"
                        disabled={loading}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{
                            height: "auto",
                            maxHeight: "140px", // 5 lines * line-height (24px)
                        }}
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-2 sm:gap-4">
                        <div className="flex flex-wrap gap-2 items-center">
                            <Button
                                type="button"
                                variant={
                                    access === "PRIVATE" ? "default" : "outline"
                                }
                                className="w-[90px]"
                                size="sm"
                                onClick={() =>
                                    setAccess((p) =>
                                        p === "PUBLIC" ? "PRIVATE" : "PUBLIC"
                                    )
                                }
                                disabled={
                                    !isAuthenticated || loading || enableCurl
                                }
                            >
                                {access === "PUBLIC" ? <LockOpen /> : <Lock />}
                                <span className="capitalize">
                                    {access.toLowerCase()}
                                </span>
                            </Button>
                            <Button
                                type="button"
                                variant={enableCurl ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                    setEnableCurl(!enableCurl);
                                    setAccess("PUBLIC");
                                }}
                                disabled={loading}
                            >
                                {enableCurl ? <Earth /> : <EarthLock />}
                                <span>cURL</span>
                            </Button>
                            <Button
                                type="button"
                                variant={enableOneFetch ? "default" : "outline"}
                                size="sm"
                                onClick={() =>
                                    setEnableOneFetch(!enableOneFetch)
                                }
                                disabled={loading}
                            >
                                {enableOneFetch ? (
                                    <PiNumberCircleOneFill />
                                ) : (
                                    <PiNumberCircleOne />
                                )}
                                <span>One Fetch</span>
                            </Button>
                        </div>
                        <Button
                            disabled={loading}
                            type="submit"
                            size="sm"
                            className="w-fit"
                        >
                            {loading ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                <Plus />
                            )}
                            <span>Add</span>
                        </Button>
                    </div>
                    {!isAuthenticated && (
                        <span className="italic text-xs text-muted-foreground">
                            *You need to be logged in to use private access!
                        </span>
                    )}
                </form>

                {showLinkWhenAdded && savedData && (
                    <ClipBoardItem item={savedData} />
                )}
            </CardContent>
        </Card>
    );
}
