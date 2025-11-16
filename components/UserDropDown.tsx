"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/user";
import { LoaderCircle, User } from "lucide-react";
import { useState } from "react";
import { handleLogout } from "./LogoutBtn";

export default function UserDropDown() {
    const { data, isAuthenticated, loading } = useUserStore();
    const [loadingLogout, setLoadingLogout] = useState(false);

    if (!loading && !isAuthenticated) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={loading} variant="outline" size={"icon"}>
                    {loading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <User />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>{data?.name}</DropdownMenuItem>
                    <DropdownMenuItem>{data?.email}</DropdownMenuItem>
                    <DropdownMenuItem>{"Subscription: Free"}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => handleLogout(setLoadingLogout)}
                    disabled={loadingLogout}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
