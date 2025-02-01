"use client";
import { Event } from "@/lib/dto";
import { getAllEvents, getEventById } from "@/utils/actions";
import { TfiClose } from "react-icons/tfi";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const [data, setData] = useState<Event[] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { data, error } = await getAllEvents();
            if (data) {
                setData(data);
            }
            if (error) {
                setError(error);
            }
        })();
    }, []);

    const handleRegister = async (id: string) => {
        router.push(`/events/${id}/register`);
    };

    return (
        <section className="pt-20 w-full min-h-screen">
            <div className="lg:w-1/3 m-auto">
                <h2 className="font-bold font-heading lg:text-7xl text-dark tracking-wide">
                    Upcoming Events:
                </h2>
                <div className="mt-4 h-4 text-sm font-bold text-accent flex justify-start items-center gap-4">
                    {error && (
                        <>
                            <p className="text-red-800 font-medium text-lg">
                                Error Occured! {error}
                            </p>
                            <button
                                onClick={() => {
                                    setError(undefined);
                                }}
                                type="button"
                                className="text-red-700 bg-transparent hover:text-red-500 rounded-lg text-lg font-bold center-content"
                            >
                                <TfiClose fontSize={22} />
                            </button>
                        </>
                    )}
                </div>
                <div className="mt-4 flex flex-col gap-16">
                    <Suspense fallback={<div>Loading...</div>}>
                        {data &&
                            data.map((event) => (
                                <div
                                    key={event.id}
                                    className="text-left px-4 py-8 font-bold lg:text-lg border border-slate-200 rounded-md shadow-xl"
                                >
                                    <h5 className="font-semibold text-2xl mb-5">
                                        {event.name}
                                    </h5>
                                    <div className="flex font-medium mb-3">
                                        <p className="font-medium w-36">
                                            Venue:
                                        </p>
                                        <p>{event.venue}</p>
                                    </div>
                                    <div className="flex font-medium mb-5">
                                        <p className="font-medium w-36">
                                            Event Date:
                                        </p>
                                        <p>{event.venue}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRegister(event.id)}
                                        className="text-light bg-accent hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-md text-sm px-5 py-2.5 text-center"
                                    >
                                        REGISTER
                                    </button>
                                </div>
                            ))}
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default Page;
