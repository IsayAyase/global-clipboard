import Element from "./Element";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    return (
        <div>
            <Element code={code} />
        </div>
    );
}
