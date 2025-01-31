"use server";

import { z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "@/lib/schema";
import { FieldValues, UseFormSetError } from "react-hook-form";

type UserCreate = z.infer<typeof SignUpFormSchema>;

type UserLogin = z.infer<typeof LoginFormSchema>;

type Event = {
    id: number;
    name: string;
    email: string;
    body: string;
};

export async function registerUser(data: UserCreate) {
    const result = SignUpFormSchema.safeParse(data);

    if (result.error) {
        return {
            data: false,
            error: result.error.format(),
        };
    }

    if (result.success) {
        return {
            error: false,
            data: result.data,
        };
    }
}

export async function loginUser(
    data: UserLogin,
    setError: UseFormSetError<FieldValues>
) {
    // Validate input using Zod schema
    const result = LoginFormSchema.safeParse(data);

    if (!result.success) {
        setError("email", {
            type: "validation",
            message: "Invalid input. Please check your email.",
        });
        return { data: null, error: result.error.format() };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
                method: "POST",
                credentials: "include", // Ensures cookies are sent
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (response.status === 422) {
            setError("email", {
                type: "validation",
                message: "Email validation failed or missing.",
            });
            return { data: null, error: "Validation failed" };
        }

        if (response.status === 404) {
            setError("email", {
                type: "not_found",
                message: "Email does not exist.",
            });
            return { data: null, error: "Email not found" };
        }

        if (response.status === 500) {
            setError("email", {
                type: "server_error",
                message: "Internal server error. Please try again later.",
            });
            return { data: null, error: "Server error" };
        }

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const userData = await response.json();
        return { data: userData, error: null };
    } catch (error) {
        setError("email", {
            type: "network",
            message: "Network error. Please try again.",
        });
        return { data: null, error: "Something Went Wrong!" };
    }
}

export async function getAllEvents(): Promise<{
    err: boolean;
    data: Event[] | null;
}> {
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        );

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
