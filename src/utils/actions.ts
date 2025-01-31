"use server";

import { z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "@/lib/schema";

type UserCreate = z.infer<typeof SignUpFormSchema>;

type UserLogin = z.infer<typeof LoginFormSchema>;

type Event = {
    id: number;
    name: string;
    venue: string;
    eventDate: string;
};

export async function registerUser(data: UserCreate) {
    const result = SignUpFormSchema.safeParse(data);

    if (result.error) {
        return false;
    }

    if (result.success) {
        return true;
    }
}

export async function loginUser(data: UserLogin) {
    // Validate input using Zod schema
    const result = LoginFormSchema.safeParse(data);

    if (!result.success) {
        return { error: "Form Validation Failed!" };
    }

    try {
        const response = await fetch("http://localhost:8080/users/check", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-User-Email": data.email,
            },
        });

        if (response.status === 422) {
            return { error: "Unprocessable Entity!" };
        }

        if (response.status === 404) {
            return { error: "User with email not found!" };
        }

        if (response.status === 500) {
            return { error: "Internal Server Error!" };
        }

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
        return { error: undefined };
    } catch (error) {
        return { error: "Something Went Wrong!" };
    }
}

export async function getAllEvents(): Promise<{
    err: boolean;
    data: Event[] | null;
}> {
    try {
        const res = await fetch("http://localhost:8080/events");

        const data = await res.json();

        return {
            err: false,
            data: data,
        };
    } catch (error) {
        return {
            err: false,
            data: null,
        };
    }
}
