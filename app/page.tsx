import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToClipBoard from "./clipboard/_components/AddToClipBoard";

export default function Home() {
    return (
        <div className="space-y-4">
            <AddToClipBoard showLinkWhenAdded />
            <div className="flex gap-2 items-center">
                <Link href={"/login"}>
                    <Button>Login</Button>
                </Link>
                <Link href={"/clipboard"}>
                    <Button>Clipboard</Button>
                </Link>
            </div>
        </div>
    );
}
