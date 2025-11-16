"use client";

import AddToClipBoard from "./_components/AddToClipBoard";
import DeleteAllBtn from "./_components/DeleteAllBtn";
import ListClipBoard from "./_components/ListClipBoard";

export default function Page() {
    return (
        <div className="">
            <div className="sticky top-4 space-y-6 z-10 bg-background">
                <AddToClipBoard />

                <div className="flex items-center justify-between gap-4 pb-4">
                    <h4 className="text-lg font-semibold">Clipboard</h4>
                    <DeleteAllBtn />
                </div>
            </div>
            <div className="">
                <ListClipBoard />
            </div>
        </div>
    );
}
