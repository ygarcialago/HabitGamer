import { z } from "zod";

export const changeActivenessHabitSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
});

export type changeActivenessHabitDTO = z.infer<typeof changeActivenessHabitSchema>;
