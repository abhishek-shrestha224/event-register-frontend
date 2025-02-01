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
                        <main className="text-left py-8 font-bold lg:text-lg">
                            <h5 className="font-semibold text-2xl mb-5">
                                {data.name}
                            </h5>
                            <div className="flex font-medium mb-3">
                                <p className="font-medium w-36">Venue:</p>
                                <p>{data.venue}</p>
                            </div>
                            <div className="flex font-medium mb-5">
                                <p className="font-medium w-36">Event Date:</p>
                                <p>{data.eventDate}</p>
                            </div>
                        </main>
                        <EventRegistrationForm />
                    </>
                )}
            </div>
        </section>
    );
}
