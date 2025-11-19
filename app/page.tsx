import CTABtn from "./_components/CTABtn";
import AddToClipBoard from "./clipboard/_components/AddToClipBoard";

export default function Home() {
    return (
        <div className="space-y-4">
            <AddToClipBoard showLinkWhenAdded />
            <div className="flex gap-2 justify-center">
               <CTABtn />
            </div>
        </div>
    );
}
