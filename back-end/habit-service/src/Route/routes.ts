import { Router } from "express"
import { authenticateAndValidate } from "../Middleware/validateBodyAuth.js";
import { createHabitSchema } from "../DTO/createHabit.dto.js";
import { HabitController } from "../Controller/habitController.js";

const route = Router();

route.post("/createHabit", authenticateAndValidate(createHabitSchema), HabitController.save)

export default route;