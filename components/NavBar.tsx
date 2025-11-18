import Link from "next/link";
import ThemeBtn from "./ThemeBtn";
import UserDropDown from "./UserDropDown";

export default function NavBar() {
    return (
        <div className="my-6 flex justify-between gap-4">
            <Link href="/">
                <h1 className="text-xl md:text-2xl font-bold">CB</h1>
            </Link>
            <div className="flex gap-2 items-center">
                <UserDropDown />
                <ThemeBtn />
            </div>
        </div>
    );
}
