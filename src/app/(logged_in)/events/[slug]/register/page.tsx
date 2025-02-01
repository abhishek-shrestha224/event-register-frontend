export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    return (
        <section className="pt-20 w-full min-h-screen">
            <div className="lg:w-1/3 m-auto">{slug}</div>
        </section>
    );
}
