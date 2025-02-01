"use client";
import { RegisterFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { BsUpload } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Inputs = z.infer<typeof RegisterFormSchema>;
const EventRegistrationForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(RegisterFormSchema),
    });
    return (
        <div>
            <h3 className="lg:text-3xl font-bold">Registration Form</h3>
            <form className="auto center-content flex-col">
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
                <div className="w-full rounded-md shadow-xs bg-light border border-accent">
                    <label
                        htmlFor="dropzone-file"
                        className="block mb-2 text-sm font-medium text-dark"
                    >
                        <div className="flex flex-col gap-2 items-center text-gray-500 justify-center pt-5 pb-6">
                            <BsUpload fontSize={30} />
                            <p className="mb-2 text-sm">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG or JPEG (MAX. 2MB)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                        />
                    </label>
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
