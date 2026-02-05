import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { ZodError } from "zod";
import { verifyToken } from "../Utils/jwtUtils.js";

export const authenticateAndValidate = <T extends z.ZodAny>(
    bodySchema?: T
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // 1️⃣ JWT
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" });

            const token = authHeader.replace(/^Bearer\s+/i, "");
            const payload = verifyToken(token) as any;

            (req as any).user = payload;

            if (bodySchema) {
                req.body = bodySchema.parse(req.body);
            }

            next();
        } catch (err: any) {
            // Diferenciar entre error de Zod y error de JWT
            if (err instanceof ZodError) {
                return res.status(400).json({ 
                    message: "Validation failed", 
                    errors: err.message
                });
            }

            return res.status(401).json({ 
                message: "Unauthorized", 
                error: err.message 
            });
        }
    };
};
