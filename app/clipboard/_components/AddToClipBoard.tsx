"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useClipBoardStore } from "@/store/clipBoard";
import { ClipBoardAccess } from "@/types/clipBoard";
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
import { createClipboard } from "../../apiCalls";

export default function AddToClipBoard() {
    const { addData, setError } = useClipBoardStore();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [access, setAccess] = useState<ClipBoardAccess>("PUBLIC");
    const [enableCurl, setEnableCurl] = useState(false);
    const [enableOneFetch, setEnableOneFetch] = useState(false);

    const textInputRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (e?: any) => {
        if (e) e.preventDefault();
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
            addData(resData);
            setText("");
        }
    };

    useEffect(() => {
        if (loading) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                !loading &&
                textInputRef.current &&
                textInputRef.current === document.activeElement &&
                textInputRef.current?.value.trim() !== "" &&
                event.key === "Enter" &&
                !event.shiftKey
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
            <CardContent>
                <form
                    autoFocus
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 w-full"
                >
                    <Textarea
                        autoFocus
                        ref={textInputRef}
                        name="text"
                        placeholder="Type something. (Shift + Enter for send!)"
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
                                onClick={() => setEnableCurl(!enableCurl)}
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
                            >
                                {enableOneFetch ? (
                                    <PiNumberCircleOneFill />
                                ) : (
                                    <PiNumberCircleOne />
                                )}
                                <span>One Fetch</span>
                            </Button>
                        </div>
                        <Button disabled={loading} type="submit" size="sm" className="w-fit">
                            {loading ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                <Plus />
                            )}
                            <span>Add</span>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
