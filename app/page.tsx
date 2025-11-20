import { Code, Lock, Timer } from "lucide-react";
import { PiNumberCircleOne } from "react-icons/pi";
import CTABtn from "./_components/CTABtn";
import AddToClipBoard from "./clipboard/_components/AddToClipBoard";

const features = [
    {
        icon: <Lock className="size-6" />,
        title: "Private Access",
        description: "Only the owner can view or access an item.",
    },
    {
        icon: <Code />,
        title: "cURL Link",
        description:
            "cURL link to access your item directly from the command line.",
    },
    {
        icon: <PiNumberCircleOne className="size-6" />,
        title: "One-Time Fetch",
        description:
            "The clipboard automatically deletes the item after a single fetch.",
    },
    {
        icon: <Timer className="size-6" />,
        title: "Auto-Clear in 40 Minutes",
        description:
            "Clipboard items are automatically deleted after 40-45 minutes.",
    },
];

const FeatureCard = ({ title, description, icon }: (typeof features)[0]) => {
    return (
        <div className="flex flex-col gap-1 border p-2 rounded-md bg-card shadow-sm">
            <div className="flex gap-2 items-center justify-center">
                <div>{icon}</div>
                <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <p className="text-muted-foreground text-center">{description}</p>
        </div>
    );
};

export default function Home() {
    return (
        <div className="space-y-10">
            <AddToClipBoard showLinkWhenAdded />
            <div className="flex gap-2 justify-center">
                <CTABtn />
            </div>
            <div className="space-y-6">
                <h2 className="text-center text-3xl font-bold">Features</h2>
                <div className="grid grid-cols-1 gap-4">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
