import MyProfile from "@/components/MyProfile";
import Link from "next/link";

export default function Home() {
    return (
        <div className="">
            <MyProfile />
            <Link href={"/login"}>login</Link>
        </div>
    );
}
