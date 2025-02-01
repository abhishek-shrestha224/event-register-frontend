"use client";

import { useEffect, useState, use } from "react";
import Error from "@/components/Error";
import EventRegisterForm from "@/components/EventRegisterForm";
import { getEventById } from "@/utils/actions";

export default function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [eventData, setEventData] = useState<any>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const { slug } = use(params);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const { data, error } = await getEventById(slug);
                if (error) {
                    setError(error);
                } else {
                    setEventData(data);
                }
            } catch (err) {
                setError("An error occurred while fetching event data.");
            }
        };

        fetchEventData();
    }, [slug]);

    return (
        <section className="pt-20 w-full min-h-screen">
            <div className="lg:w-1/3 m-auto">
                <h1 className="font-bold font-heading lg:text-7xl text-dark">
                    Register for Event
                </h1>
                <Error error={error} />
                {eventData && (
                    <>
                        <main className="text-left py-8 font-bold lg:text-lg">
                            <h5 className="font-semibold text-2xl mb-5">
                                {eventData.name}
                            </h5>
                            <div className="flex font-medium mb-3">
                                <p className="font-medium w-36">Venue:</p>
                                <p>{eventData.venue}</p>
                            </div>
                            <div className="flex font-medium mb-5">
                                <p className="font-medium w-36">Event Date:</p>
                                <p>{eventData.eventDate}</p>
                            </div>
                        </main>
                        <EventRegisterForm />
                    </>
                )}
            </div>
        </section>
    );
}
