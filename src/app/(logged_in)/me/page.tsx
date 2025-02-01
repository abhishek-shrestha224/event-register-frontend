"use client";
import { User } from "@/lib/dto";
import React from "react";

const Page = () => {
    const user: User = JSON.parse(localStorage.getItem("user") as string);
    console.log(user);
    return (
        <section className="pt-20 w-full min-h-screen">
            <div className="lg:w-1/3 m-auto">
                <h2 className="font-bold font-heading lg:text-7xl text-dark tracking-wide">
                    My Profile:
                </h2>
                <div className="mt-20 50 flex flex-col gap-8">
                    <div className="flex gap-12 items-end">
                        <p className="lg:text-xs font-semibold w-28">
                            First Name:
                        </p>
                        <span className="lg:text-md font-bold">
                            {user.firstName}
                        </span>
                    </div>
                    <div className="flex gap-12 items-end">
                        <p className="lg:text-xs font-semibold w-28">
                            Last Name:
                        </p>
                        <span className="lg:text-md font-bold">
                            {user.lastName}
                        </span>
                    </div>{" "}
                    <div className="flex gap-12 items-end">
                        <p className="lg:text-xs font-semibold w-28">Email: </p>
                        <span className="lg:text-md font-bold">
                            {user.email}
                        </span>
                    </div>{" "}
                    <div className="flex gap-12 items-end">
                        <p className="lg:text-xs font-semibold w-28">Phone: </p>
                        <span className="lg:text-md font-bold">
                            {user.phoneNumber}
                        </span>
                    </div>{" "}
                    <div className="flex gap-12 items-end">
                        <p className="lg:text-xs font-semibold w-28">
                            Badges Owned:{" "}
                        </p>
                        <span className="lg:text-md font-bold">
                            {user.badges.length}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
