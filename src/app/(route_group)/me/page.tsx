import React from "react";

const Page = () => {
    return (
        <section className="pt-20 w-full min-h-screen">
            <div className="lg:w-1/3 m-auto">
                <h2 className="text-center font-bold font-heading lg:text-7xl text-dark tracking-wide">
                    My Profile:
                </h2>
                <div className="mt-12 flex flex-col gap-12">
                    <p className="text-left px-4 font-bold lg:text-lg">
                        First Name: John Doe
                    </p>
                    <p className="text-left px-4 font-bold lg:text-lg">
                        Last Name: John Doe
                    </p>{" "}
                    <p className="text-left px-4 font-bold lg:text-lg">
                        Email: John Doe
                    </p>{" "}
                    <p className="text-left px-4 font-bold lg:text-lg">
                        Phone Number: John Doe
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Page;
