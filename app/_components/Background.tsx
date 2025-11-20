"use client";

import { motion } from "framer-motion";

export default function Background() {
    return (
        <div>
            <motion.div
                className="fixed -z-10 top-0 left-0 w-1/2 h-full pointer-events-none"
                style={{
                    backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 20px, transparent 20px, transparent 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 20px, transparent 20px, transparent 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 40px),
          radial-gradient(circle at 20px 20px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 2px, transparent 2px)
        `,
                    backgroundSize:
                        "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
                animate={{
                    backgroundPosition: ["40px 0px", "0px 0px"],
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
            <motion.div
                className="fixed -z-10 top-0 right-0 w-1/2 h-full pointer-events-none"
                style={{
                    backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 20px, transparent 20px, transparent 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 19px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 20px, transparent 20px, transparent 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 39px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 40px),
          radial-gradient(circle at 20px 20px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, color-mix(in oklab, var(--muted-foreground) 20%, transparent) 2px, transparent 2px)
        `,
                    backgroundSize:
                        "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "40px 0px"],
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
            <div
                className="fixed -z-10 top-0 left-0 w-full h-full"
                style={{
                    background: `
                        linear-gradient(
                            to right,
                            transparent 0%,
                            color-mix(in oklab, var(--background) 20%, transparent) 10%,
                            color-mix(in oklab, var(--background) 70%, transparent) 30%,
                            color-mix(in oklab, var(--background) 80%, transparent) 40%,
                            var(--background) 50%,
                            color-mix(in oklab, var(--background) 80%, transparent) 60%,
                            color-mix(in oklab, var(--background) 70%, transparent) 70%,
                            color-mix(in oklab, var(--background) 20%, transparent) 90%,
                            transparent 100%
                        )
                    `,
                }}
            />
        </div>
    );
}
