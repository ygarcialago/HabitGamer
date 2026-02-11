import { Router } from "express"
import { PlayerController } from "../Controller/playerController.js";

const route = Router();
route.post("/", PlayerController.create);
route.patch("/takeDamage", PlayerController.takeDamage)
route.patch("/gainXp", PlayerController.addExperience)

export default route;