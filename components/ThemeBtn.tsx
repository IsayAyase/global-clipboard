"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
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
        <Button size={"icon"} variant="outline" onClick={toggleTheme}>
            <span
                className={`transform ${
                    theme === "light" ? "rotate-180" : "rotate-0"
                } transition-all duration-300 ease-out`}
            >
                {theme === "light" ? (
                    <Sun className="size-5" />
                ) : (
                    <Moon className="size-5" />
                )}
            </span>
        </Button>
    );
};

export default ThemeBtn;
