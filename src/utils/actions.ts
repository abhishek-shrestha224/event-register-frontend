"use server";

import { z } from "zod";
import {
    LoginFormSchema,
    RegisterFormSchema,
    SignUpFormSchema,
} from "@/lib/schema";
import { User, Event } from "@/lib/dto";
import { UUID } from "crypto";
import { validate } from "uuid";

type UserCreate = z.infer<typeof SignUpFormSchema>;

type UserLogin = z.infer<typeof LoginFormSchema>;

type EventRegister = z.infer<typeof RegisterFormSchema>;

export async function registerUser(
    data: UserCreate
): Promise<{ data: User | undefined; error: string | undefined }> {
    const result = SignUpFormSchema.safeParse(data);

    if (!result.success) {
        return { data: undefined, error: "Form Validation Failed!" };
    }
    try {
        const res = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.status === 400) {
            throw new Error("404-Bad Request");
        }

        if (!res.ok) {
            throw new Error("500-Internal Server Error");
        }

        const userData = await res.json();
        return { data: userData, error: undefined };
    } catch (err) {
        if (err instanceof Error) {
            return { data: undefined, error: err.message };
        } else {
            return { data: undefined, error: "Something Went Wrong" };
        }
    }
}

export async function registerFOrEvent(
    data: EventRegister
): Promise<{ data: EventRegister | undefined; error: string | undefined }> {
    console.log(data);
    const result = RegisterFormSchema.safeParse(data);

    if (!result.success) {
        console.log("Validation Failed");
        return { data: undefined, error: "Form Validation Failed!" };
    }

    return { data: result.data, error: undefined };
}

export async function loginUser(
    data: UserLogin
): Promise<{ data: User | undefined; error: string | undefined }> {
    const result = LoginFormSchema.safeParse(data);

    if (!result.success) {
        return { data: undefined, error: "Form Validation Failed!" };
    }

    try {
        const res = await fetch("http://localhost:8080/users/check", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-User-Email": data.email,
            },
        });

        if (res.status === 422) {
            throw new Error("422-Unprocessable Entity");
        }

        if (res.status === 404) {
            throw new Error("404-Not Found");
        }

        if (!res.ok) {
            throw new Error("500-Internal Server Error");
        }

        const userData = await res.json();
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
    error: undefined | string;
    data: Event[] | undefined;
}> {
    try {
        const res = await fetch("http://localhost:8080/events");

        if (!res.ok) {
            throw new Error("500-Internal Server Error");
        }

        const data = await res.json();
        console.log(data);
        return {
            error: undefined,
            data: data,
        };
    } catch (err) {
        if (err instanceof Error) {
            return { data: undefined, error: err.message };
        } else {
            return { data: undefined, error: "Something Went Wrong" };
        }
    }
}

export async function getEventById(id: string): Promise<{
    error: undefined | string;
    data: Event | undefined;
}> {
    try {
        if (!id || id.trim() === "") {
            throw new Error(
                "Invalid ID: ID cannot be null, blank, or undefined."
            );
        }
        if (!validate(id)) {
            throw new Error("Invalid ID: Not a valid UUID format.");
        }

        const uuid: UUID = id as UUID;

        const res = await fetch(`http://localhost:8080/events/${uuid}`);

        if (!res.ok) {
            throw new Error("500-Internal Server Error");
        }

        const data = await res.json();
        console.log(data);
        return {
            data: data,
            error: undefined,
        };
    } catch (err) {
        if (err instanceof Error) {
            return { data: undefined, error: err.message };
        } else {
            return { data: undefined, error: "Something Went Wrong" };
        }
    }
}
