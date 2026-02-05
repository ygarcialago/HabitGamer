import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginUserSchema = z.object({
    email: z.string().regex(emailRegex, {
        message: "Invalid email format (Regex validation)",
    }),
    plainPassword: z.string().min(6, "Password too short"),
});

export type LoginUserDTO = z.infer<typeof loginUserSchema>;