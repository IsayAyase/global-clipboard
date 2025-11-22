import Footer from "@/components/Footer";
import { LoadUserState } from "@/components/LoadUserState";
import NavBar from "@/components/NavBar";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Background from "./_components/Background";
import "./globals.css";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-ubuntu",
});

export const metadata: Metadata = {
    title: "ClipB",
    description: "Clipboard made simple.",
    icons: {
        icon: "/logo.png",
    },
    openGraph: {
        title: "ClipB",
        description: "Clipboard made simple.",
        siteName: "ClipB",
        url: "https://clipb.prabhatlabs.dev",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "https://clipb.prabhatlabs.dev/preview.png",
                width: 1200,
                height: 630,
                alt: "ClipB",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ClipB",
        description: "Clipboard made simple.",
        images: ["https://clipb.prabhatlabs.dev/preview.png"],
        creator: "@prabhatlabs",
    },
    robots: {
        index: true,
        nocache: true,
        googleBot: {
            index: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${ubuntu.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Toaster position="top-center" />
                    <div className="min-h-dvh max-w-xl w-full mx-auto px-4 lg:px-0">
                        <NavBar />
                        <div className="h-full">{children}</div>
                        <Footer />
                    </div>
                    <Background />
                </ThemeProvider>
                <LoadUserState />
            </body>
        </html>
    );
}
