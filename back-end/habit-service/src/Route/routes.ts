import { Router } from "express"
import { authenticateAndValidate } from "../Middleware/validateBodyAuth.js";
import { createHabitSchema } from "../DTO/createHabit.dto.js";
import { changeActivenessHabitSchema } from "../DTO/changeActivenessHabit.dto.js";
import { HabitController } from "../Controller/habitController.js";
import { HabitLogController } from "../Controller/habitLogController.js";

const route = Router();

route.post("/createHabit", authenticateAndValidate(createHabitSchema), HabitController.save)
route.get("/:userId", HabitController.getUserHabits);
route.patch("/changeActivity", authenticateAndValidate(changeActivenessHabitSchema), HabitController.changeActiveness)

route.post("/:habitId/mark", HabitLogController.markHabit)
route.get("/:habitId/streak", HabitLogController.getStreak)

export default route;