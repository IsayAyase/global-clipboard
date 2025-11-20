import Link from "next/link";
import ThemeBtn from "./ThemeBtn";
import UserDropDown from "./UserDropDown";

export default function NavBar() {
    return (
        <div className="py-6 flex justify-between gap-4">
            <Link href="/" className="flex items-center">
                <h1 className="text-xl md:text-2xl font-bold">ClipB</h1>
            </Link>
            <div className="flex gap-2 items-center">
                <UserDropDown />
                <ThemeBtn />
            </div>
        </div>
    );
}
