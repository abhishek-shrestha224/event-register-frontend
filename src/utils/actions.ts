"use server";

import { z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "@/lib/schema";
import { User, Event } from "@/lib/dto";

type UserCreate = z.infer<typeof SignUpFormSchema>;

type UserLogin = z.infer<typeof LoginFormSchema>;

export async function registerUser(
    data: UserCreate
): Promise<{ data: User | undefined; error: string | undefined }> {
    const result = SignUpFormSchema.safeParse(data);

    if (!result.success) {
        return { data: undefined, error: "Form Validation Failed!" };
    }
    try {
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 400) {
            throw new Error("404-Bad Request");
        }

        if (!response.ok) {
            throw new Error("500-Internal Server Error");
        }

        const userData = await response.json();
        return { data: userData, error: undefined };
    } catch (err) {
        if (err instanceof Error) {
            return { data: undefined, error: err.message };
        } else {
            return { data: undefined, error: "Something Went Wrong" };
        }
    }
}

export async function loginUser(
    data: UserLogin
): Promise<{ data: User | undefined; error: string | undefined }> {
    const result = LoginFormSchema.safeParse(data);

    if (!result.success) {
        return { data: undefined, error: "Form Validation Failed!" };
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
            throw new Error("422-Unprocessable Entity");
        }

        if (response.status === 404) {
            throw new Error("404-Not Found");
        }

        if (!response.ok) {
            throw new Error("500-Internal Server Error");
        }

        const userData = await response.json();
        return { data: userData, error: undefined };
    } catch (err) {
        if (err instanceof Error) {
            return { data: undefined, error: err.message };
        } else {
            return { data: undefined, error: "Something Went Wrong" };
        }
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
