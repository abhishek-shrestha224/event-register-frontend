import { z } from "zod";

export const SignUpFormSchema = z.object({
    firstName: z
        .string()
        .nonempty("First Name is required")
        .min(2, "First Name must be at least 2 characters long")
        .regex(/^[a-zA-Z]+$/, "First Name can only contain letters")
        .trim(),

    lastName: z
        .string()
        .nonempty("Last Name is required")
        .min(2, "Last Name must be at least 2 characters long")
        .regex(/^[a-zA-Z]+$/, "Last Name can only contain letters")
        .trim(),
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required")
        .trim()
        .refine(
            (value) =>
                !/\b(?:tempmail|guerrillamail|mailinator)\.com\b/.test(value),
            {
                message: "Disposable email addresses are not allowed",
            }
        ),

    phoneNumber: z
        .string()
        .nonempty("Phone Number is required")
        .length(10, "Phone Number must be 10 digits")
        .refine((value) => /^9\d{9}$/.test(value), {
            message: "Phone number must have valid format",
        }),
});

export const LoginFormSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required")
        .trim()
        .refine(
            (value) =>
                !/\b(?:tempmail|guerrillamail|mailinator)\.com\b/.test(value),
            {
                message: "Disposable email addresses are not allowed",
            }
        ),
});

export const RegisterFormSchema = z.object({
    registrationType: z.enum(
        ["ORGANIZER", "VOLUNTEER", "SPEAKER", "VIP", "ATTENDEE"],
        {
            errorMap: (issue) => {
                return { message: "Invalid registration type." };
            },
        }
    ),
    photo: z
        .object({
            file: z
                .instanceof(File)
                .refine((file) => /\.(jpg|jpeg|png)$/i.test(file.name), {
                    message:
                        "Invalid file type. Only JPG, JPEG, and PNG files are allowed.",
                })
                .refine((file) => file.size <= 2 * 1024 * 1024, {
                    message: "File size must be less than 2MB.",
                })
                .refine(
                    (file) => /^[a-zA-Z0-9_]+$/.test(file.name.split(".")[0]),
                    {
                        message:
                            "Filename can only contain letters, numbers, and underscores.",
                    }
                ),
        })
        .refine((data) => data.file !== null, {
            message: "File is required.",
        }),
});
