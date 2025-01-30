"use client";

import React from "react";
import { useForm } from "react-hook-form";

type SignUpInput = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
};
const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInput>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
        },
    });

    return (
        <div className="border-2 lg:w-1/3 center-content flex-col gap-4 px-4 py-12">
            <h3 className="lg:text-3xl font-bold">Sign Up Form</h3>

            <form
                className="w-[90%]  mx-auto center-content flex-col"
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
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
                            type="numeric"
                            {...register("firstName")}
                            className="shadow-xs bg-light border border-accent text-dark text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 "
                            required
                        />
                        <p className="mt-2 text-sm text-green-700">
                            <span className="font-medium">Ok :)</span> Username
                            available!
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
                            required
                        />
                        <p className="mt-2 text-sm text-green-700">
                            <span className="font-medium">Ok :)</span> Username
                            available!
                        </p>
                    </div>
                </div>
                <div className="mb-5 w-full">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-dark"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className="shadow-xs bg-light border border-accent text-dark text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 "
                        placeholder="youemail@email.com"
                        required
                    />
                    <p className="mt-2 text-sm text-green-700">
                        <span className="font-medium">Ok :)</span> Username
                        available!
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
                        required
                    />
                    <p className="mt-2 text-sm text-green-700">
                        <span className="font-medium">Ok :)</span> Username
                        available!
                    </p>
                </div>

                <button
                    type="submit"
                    className="text-light bg-accent hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Register new account
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
