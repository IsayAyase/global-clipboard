"use client";

import { Card, CardContent } from "@/components/ui/card";
import envvars from "@/constants/envvars";
import { formatDateAgo } from "@/lib/dateFormat";
import { useClipBoardStore } from "@/store/clipBoard";
import { IClipBoard } from "@/types/clipBoard";
import { Earth, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { PiNumberCircleOne } from "react-icons/pi";
import { toast } from "sonner";
import { getAllClipboards } from "../../apiCalls";
import CopyToClipboard, { copyToClipboardFunc } from "./CopyToClipboard";
import DeleteFromClipBoardBtn from "./DeleteFromClipBoardBtn";

export default function ListClipBoard() {
    const { data, setData, loading, setLoading, setError } =
        useClipBoardStore();

    const [expendedIndex, setExpendedIndex] = useState(-1);

    useEffect(() => {
        getAllClipboards(setLoading, setError).then((res) =>
            setData(res || [])
        );
    }, []);

    return (
        <>
            {loading ? (
                <div className="space-y-4">
                    <ClipBoardItemLoading />
                    <ClipBoardItemLoading />
                </div>
            ) : data.length === 0 ? (
                <div className="flex flex-col items-center max-w-2xs md:max-w-xs mx-auto text-center my-6 p-4">
                    <span className="text-sm md:text-base font-semibold">
                        Nothing here
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                        You'll see your clipboard history here once you add
                        somehing.
                    </span>
                </div>
            ) : (
                <div className="space-y-4">
                    {data?.map((item, index) => (
                        <ClipBoardItem
                            key={index}
                            item={item}
                            expended={expendedIndex === index}
                            toggleExpend={() =>
                                setExpendedIndex((p) =>
                                    p === index ? -1 : index
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export function ClipBoardItem({
    item,
    showLink = false,
    expended,
    toggleExpend,
}: {
    item: IClipBoard;
    showLink?: boolean;
    expended?: boolean;
    toggleExpend?: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const cbLink = `${envvars.NEXT_URL}/cb/${item.code}`;

    return (
        <Card
            onClick={() =>
                loading
                    ? null
                    : copyToClipboardFunc(
                          cbLink,
                          setLoading,
                          toast,
                          "Link copied!",
                          "Error copying link!"
                      )
            }
            className="relative cursor-default shadow-[0_0_20px_1px] shadow-transparent hover:shadow-primary/10 hover:scale-[100.5%] transition-all duration-100 ease-in-out"
        >
            <CardContent className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2 items-center">
                        {item.access === "PRIVATE" && (
                            <Lock className="size-4" />
                        )}
                        {item.enableCurl && <Earth className="size-4" />}
                        {item.enableOneFetch && (
                            <PiNumberCircleOne className="size-4" />
                        )}
                        <span className="text-xs text-muted-foreground">
                            {item.access &&
                                item.enableCurl &&
                                item.enableOneFetch &&
                                "•"}
                            {formatDateAgo(item.createdAt)}
                        </span>
                    </div>

                    {showLink && item.text && (
                        <CopyToClipboard text={item.text} label={cbLink} />
                    )}

                    <p
                        className={`w-full leading-5 text-sm ${
                            !expended ? "line-clamp-3 sm:line-clamp-2" : ""
                        }`}
                    >
                        {item.text}
                    </p>
                </div>
                <div className="absolute top-0 right-0 m-2 z-10 flex gap-1 items-center">
                    <DeleteFromClipBoardBtn
                        className="text-destructive hover:text-destructive"
                        code={item.code}
                    />
                    {item.text && !showLink && (
                        <CopyToClipboard text={item.text} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export function ClipBoardItemLoading({}: {}) {
    return (
        <Card className="">
            <CardContent className="flex justify-between items-start gap-4">
                <div className="flex flex-col w-full gap-2">
                    <span className="text-xs animate-pulse bg-muted text-transparent w-36">
                        loading time
                    </span>
                    <p
                        className={`leading-5 text-sm animate-pulse bg-muted text-transparent w-full`}
                    >
                        loading text
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
