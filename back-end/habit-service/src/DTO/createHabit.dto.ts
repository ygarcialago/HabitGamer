import { z } from "zod";
import { HabitKind, HabitFrequency, HabitImpact } from "../Enum/habits.enum.js";



export const createHabitSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  userId: z.int(),
  description: z.string().nullable().optional(),
  kind: z.enum(HabitKind),
  frequency: z.enum(HabitFrequency),
  impact: z.enum(HabitImpact),
  isActive: z.boolean(),
  value: z.number().int().positive("El valor debe ser un número positivo"),
});
export type CreateHabitDTO = z.infer<typeof createHabitSchema>;
