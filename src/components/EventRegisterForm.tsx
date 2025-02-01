"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { registerToEvent } from "@/utils/actions";
import Error from "./Error";

type Inputs = {
    registrationType: string;
    photo: File;
};

const EventRegistrationForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    return (
        <div>
            <h3 className="lg:text-3xl font-bold">Registration Form</h3>
            <Error error={errorMessage} />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="auto center-content flex-col"
            >
                <div className="w-full mt-8">
                    <label
                        htmlFor="registrationType"
                        className="block mb-2 text-sm font-medium text-dark"
                    >
                        First Name:
                    </label>
                    <select
                        id="registrationType"
                        {...register("registrationType")}
                        defaultValue="ATTENDEE"
                        className="shadow-xs bg-light border border-accent text-dark text-sm rounded-md focus:ring-accent focus:border-accent block w-full p-2.5"
                    >
                        <option value="ATTENDEE">Attendee</option>
                        <option value="VIP">VIP</option>
                        <option value="SPEAKER">Speaker</option>
                        <option value="VOLUNTEER">Voliunteer</option>
                        <option value="ORGANIZER">Organizer</option>
                    </select>
                    <p className="mt-2 text-xs font-medium text-red-700">
                        <span className="mr-1">
                            {errors.registrationType && "Error!"}
                        </span>
                        {errors.registrationType?.message}
                    </p>
                </div>
                <div className="w-full ">
                    <label
                        htmlFor="photo"
                        className="block mb-2 text-sm font-medium text-dark"
                    ></label>
                    <input
                        id="photo"
                        type="file"
                        className="rounded-md shadow-xs bg-light border border-accent w-full"
                        {...register("photo")}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-8 text-light bg-accent hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    REGISTER
                </button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;
