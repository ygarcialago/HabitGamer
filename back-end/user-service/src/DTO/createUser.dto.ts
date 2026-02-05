import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const createUserSchema = z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().regex(emailRegex, {
        message: "Invalid email format (Regex validation)",
    }),
    password: z.string().min(6, "Password too short"),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
