"use client";

import { useTheme } from "next-themes";
import { IoSunnyOutline } from "react-icons/io5";
import { RiMoonClearLine } from "react-icons/ri";
import { Button } from "./ui/button";

const ThemeBtn = () => {
    const { theme, setTheme, systemTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(
            theme === "system"
                ? systemTheme === "dark"
                    ? "light"
                    : "dark"
                : theme === "light"
                ? "dark"
                : "light"
        );
    };

    return (
        <Button
            size={"icon"}
            variant="outline"
            onClick={toggleTheme}
            className={`transform ${
                theme === "light" ? "rotate-180" : "rotate-0"
            } transition-all duration-300 ease-out`}
        >
            {theme === "light" ? (
                <IoSunnyOutline className="size-5" />
            ) : (
                <RiMoonClearLine className="size-5" />
            )}
        </Button>
    );
};

export default ThemeBtn;
