import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex justify-between items-center gap-4 mt-10 mb-4 text-muted-foreground text-xs lg:text-sm">
            <span>{"clipb.prabhatlabs.dev • 2025"}</span>
            <div className="flex gap-1 items-center">
                <Link
                    href="https://github.com/IsayAyase/cb"
                    className="hover:underline"
                >
                    gitHub
                </Link>
                <span>{"•"}</span>
                <Link
                    href="https://x.com/prabhatlabs"
                    className="hover:underline"
                >
                    X
                </Link>
            </div>
        </footer>
    );
}
