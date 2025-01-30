"use server";

import { z } from "zod";
import { SignUpFormSchema } from "@/lib/schema";

type UserCreate = z.infer<typeof SignUpFormSchema>;

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
