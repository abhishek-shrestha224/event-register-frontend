import { getAllEvents } from "@/utils/actions";
import React, { Suspense } from "react";

const Page = async () => {
    const data = await getAllEvents();
    return (
        <section className="pt-20 w-full min-h-screen">
            <div className="lg:w-1/3 m-auto">
                <h2 className="font-bold font-heading lg:text-7xl text-dark tracking-wide">
                    Upcoming Events:
                </h2>
                <div className="mt-12 flex flex-col gap-16">
                    <Suspense fallback={<div>Loading...</div>}>
                        {data.err && <div>Something Went Wrong !</div>}
                        {data.data &&
                            data.data.map((event) => (
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
                                    <div className="flex font-medium">
                                        <p className="font-medium w-36">
                                            Event Date:
                                        </p>
                                        <p>{event.venue}</p>
                                    </div>
                                </div>
                            ))}
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default Page;
