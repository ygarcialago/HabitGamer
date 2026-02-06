import { Router } from "express"
import { authenticateAndValidate } from "../Middleware/validateBodyAuth.js";
import { createHabitSchema } from "../DTO/createHabit.dto.js";
import { changeActivenessHabitSchema } from "../DTO/changeActivenessHabit.dto.js";
import { HabitController } from "../Controller/habitController.js";

const route = Router();

route.post("/createHabit", authenticateAndValidate(createHabitSchema), HabitController.save)

route.patch("/changeActivity", authenticateAndValidate(changeActivenessHabitSchema), HabitController.changeActiveness)

export default route;