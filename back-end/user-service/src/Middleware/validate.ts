import type { Request, Response, NextFunction } from "express";
import z from "zod";

export const ValidateBody = (schema : z.ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next();
        } catch (error) {
            res.status(400).json({error:"Invalid body"});
        }
    }
}