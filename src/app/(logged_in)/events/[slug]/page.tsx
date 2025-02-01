import Error from "@/components/Error";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import { getEventById } from "@/utils/actions";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const { data, error } = await getEventById(slug);
    return (
        <section className="pt-20 w-full min-h-screen">
            <div className="lg:w-1/3 m-auto">
                <h1 className="font-bold font-heading lg:text-7xl text-dark">
                    Register for Event
                </h1>
                <Error error={error} />
                {data && (
                    <>
                        <EventRegistrationForm />
                    </>
                )}
            </div>
        </section>
    );
}
