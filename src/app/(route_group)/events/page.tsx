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
                <div className="mt-12 flex flex-col gap-12">
                    <Suspense fallback={<div>Loading...</div>}>
                        {data.err && <div>Something Went Wrong !</div>}
                        {data.data &&
                            data.data.map((event) => (
                                <div
                                    key={event.id}
                                    className="text-left px-4 font-bold lg:text-lg"
                                >
                                    <p className="font-bold">{event.name}</p>
                                    <p className="font-medium">{event.email}</p>
                                    <p className="font-medium">{event.body}</p>
                                </div>
                            ))}
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default Page;
