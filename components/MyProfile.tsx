"use client";

import { useUserStore } from "@/store/user";
import LogoutBtn from "./LogoutBtn";

const MyProfile = () => {
    const { data } = useUserStore();
    return (
        <div>
            <h1>{data?.email}</h1>
            <h1>{data?.name}</h1>
            <h1>{data?.id}</h1>
            <LogoutBtn />
        </div>
    );
};

export default MyProfile;
