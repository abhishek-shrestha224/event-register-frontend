"use server";

import { z } from "zod";
import { LoginFormSchema, SignUpFormSchema } from "@/lib/schema";
import { User, Event } from "@/lib/dto";
import { UUID } from "crypto";
import { validate } from "uuid";

type UserCreate = z.infer<typeof SignUpFormSchema>;

type UserLogin = z.infer<typeof LoginFormSchema>;

export async function registerUser(
    data: UserCreate
): Promise<{ data: User | null; error: string | null }> {
    const result = SignUpFormSchema.safeParse(data);

    if (!result.success) {
        return { data: null, error: "Form Validation Failed!" };
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
        return { data: userData, error: null };
    } catch (err) {
        if (err instanceof Error) {
            return { data: null, error: err.message };
        } else {
            return { data: null, error: "Something Went Wrong" };
        }
    }
}

export async function registerToEvent(formData: {
    registrationType: string;
    photo: File;
}): Promise<{
    at: string | null;
    message: string | null;
}> {
    console.log(formData);
    const required = ["ORGANIZER", "VOLUNTEER", "SPEAKER", "VIP", "ATTENDEE"];
    try {
        if (!required.includes(formData.registrationType)) {
            console.log("invalid reg type");
            return {
                at: "registrationType",
                message: "Invalid Registration Type",
            };
        }

        const photoFile = Array.isArray(formData.photo)
            ? formData.photo[0]
            : formData.photo;

        if (!photoFile) {
            console.log("photo not found");
            return {
                at: "photo",
                message: "Photo is required",
            };
        }

        const fileNamePattern = /^[a-zA-Z0-9_]+$/;
        const filePath = photoFile.name;
        const fileName = filePath.split(".").shift();
        const extension = filePath.split(".").pop();
        console.log(filePath);
        console.log(fileName);
        console.log(extension);

        if (!fileNamePattern.test(fileName)) {
            console.log("invalid filename");
            return {
                at: "photo",
                message: "Invalid Filename",
            };
        }

        const maxFileSize = 2 * 1024 * 1024;
        if (photoFile.size > maxFileSize) {
            console.log("file too large");
            return {
                at: "photo",
                message: "File must be less than 2MB",
            };
        }

        const validExtensions = ["png", "jpg", "jpeg"];
        // Get file extension and convert to lowercase

        if (!validExtensions.includes(extension.toLocaleLowerCase())) {
            console.log("invalid extension");
            return {
                at: "photo",
                message: "File must be PNG, JPG, or JPEG.",
            };
        }
        console.log("all ok");
        return {
            at: null,
            message: null,
        };
    } catch (err) {
        if (err instanceof Error) {
            return { at: null, message: err.message };
        } else {
            return { at: null, message: "No idea" };
        }
    }
}

export async function loginUser(
    data: UserLogin
): Promise<{ data: User | null; error: string | null }> {
    const result = LoginFormSchema.safeParse(data);

    if (!result.success) {
        return { data: null, error: "Form Validation Failed!" };
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
        return { data: userData, error: null };
    } catch (err) {
        if (err instanceof Error) {
            return { data: null, error: err.message };
        } else {
            return { data: null, error: "Something Went Wrong" };
        }
    }
}

export async function getAllEvents(): Promise<{
    error: null | string;
    data: Event[] | null;
}> {
    try {
        const res = await fetch("http://localhost:8080/events");

        if (!res.ok) {
            throw new Error("500-Internal Server Error");
        }

        const data = await res.json();
        console.log(data);
        return {
            error: null,
            data: data,
        };
    } catch (err) {
        if (err instanceof Error) {
            return { data: null, error: err.message };
        } else {
            return { data: null, error: "Something Went Wrong" };
        }
    }
}

export async function getEventById(id: string): Promise<{
    error: null | string;
    data: Event | null;
}> {
    try {
        if (!id || id.trim() === "") {
            throw new Error("Invalid ID: ID cannot be null, blank, or null.");
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
            error: null,
        };
    } catch (err) {
        if (err instanceof Error) {
            return { data: null, error: err.message };
        } else {
            return { data: null, error: "Something Went Wrong" };
        }
    }
}
