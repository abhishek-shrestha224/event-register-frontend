"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/lib/schema";
import { z } from "zod";
import { registerUser } from "@/utils/actions";

type Inputs = z.infer<typeof SignUpFormSchema>;
const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(SignUpFormSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const processForm: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        const result = await registerUser(data);

        if (!result) {
            console.error("Something Went Wrong");
            return;
        }

        if (result.error) {
            console.error(result.error);
            return;
        }
        reset();
        console.log(data);
        setIsLoading(false);
    };

    return (
        <div className="border-2 lg:w-1/3 center-content flex-col gap-4 px-4 py-12">
            <h3 className="lg:text-3xl font-bold">Sign Up Form</h3>

            <form
                className="w-[90%]  mx-auto center-content flex-col"
                onSubmit={handleSubmit(processForm)}
            >
                <div className="mb-5  w-full flex justify-between ">
                    <div className=" w-[48%]">
                        <label
                            htmlFor="firstName"
                            className="block mb-2 text-sm font-medium text-dark"
                        >
                            First Name:
                        </label>
                        <input
                            type="text"
                            {...register("firstName")}
                            className="shadow-xs bg-light border border-accent text-dark text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 "
                        />
                        <p className="mt-2 text-xs font-medium text-red-700">
                            <span className="mr-1">
                                {errors.firstName && "Error!"}
                            </span>
                            {errors.firstName?.message}
                        </p>
                    </div>

                    <div className=" w-[48%]">
                        <label
                            htmlFor="lastName"
                            className="block mb-2 text-sm font-medium text-dark"
                        >
                            Last Name:
                        </label>
                        <input
                            type="text"
                            {...register("lastName")}
                            className="shadow-xs bg-light border border-accent text-dark text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 "
                        />
                        <p className="mt-2 font-medium text-xs text-red-700">
                            <span className="mr-1">
                                {" "}
                                {errors.lastName && "Error!"}
                            </span>{" "}
                            {errors.lastName?.message}
                        </p>
                    </div>
                </div>
                <div className="mb-5 w-full">
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-dark"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className="shadow-xs bg-light border border-accent text-dark text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 "
                        placeholder="youemail@email.com"
                    />
                    <p className="mt-2 font-medium text-xs text-red-700">
                        <span className="mr-1">
                            {" "}
                            {errors.email && "Error!"}
                        </span>{" "}
                        {errors.email?.message}
                    </p>
                </div>
                <div className="mb-5  w-full">
                    <label
                        htmlFor="phoneNumber"
                        className="block mb-2 text-sm font-medium text-dark"
                    >
                        Phone Number:
                    </label>
                    <input
                        type="numeric"
                        {...register("phoneNumber")}
                        className="shadow-xs bg-light border border-accent text-dark text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 "
                    />
                    <p className="mt-2 text-xs font-medium text-red-700">
                        <span className="mr-1">
                            {" "}
                            {errors.phoneNumber && "Error!"}
                        </span>{" "}
                        {errors.phoneNumber?.message}
                    </p>
                </div>

                <button
                    type="submit"
                    className="text-light bg-accent hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
