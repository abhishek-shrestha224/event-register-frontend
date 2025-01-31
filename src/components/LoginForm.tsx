"use client";

import { LoginFormSchema } from "@/lib/schema";
import { loginUser } from "@/utils/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(LoginFormSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const processForm: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        const result = await loginUser(data);

        if (!result) {
            console.error("Something Went Wrong");
            setIsLoading(false);
            return;
        }

        if (result.error) {
            setError("email", {
                type: "manual",
                message: result.error,
            });
            setIsLoading(false);
            return;
        }
        reset();
        setIsLoading(false);
        redirect("/events");
    };

    return (
        <div className="lg:w-1/3 center-content flex-col gap-4 px-4 py-8">
            <h5 className="font-bold lg:text-3xl">Enter you Email to login</h5>
            <form
                className="w-[90%] mx-auto center-content gap-4"
                onSubmit={handleSubmit(processForm)}
            >
                <div className="w-full">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-dark"
                    >
                        Email:
                    </label>
                    <input
                        type="text"
                        {...register("email")}
                        className="shadow-xs bg-light border border-accent text-dark text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 h-10"
                        placeholder="johndoe@email.com"
                    />
                    <p className="mt-2 text-xs font-medium text-red-700">
                        <span className="mr-1">
                            {" "}
                            {errors.email && "Error!"}
                        </span>{" "}
                        {errors.email?.message}
                    </p>
                </div>

                <button
                    type="submit"
                    className="text-light bg-accent hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 w-28 h-10 text-center"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
