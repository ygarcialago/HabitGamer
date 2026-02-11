import { Router } from "express"
import { PlayerController } from "../Controller/playerController.js";

const route = Router();
route.post("/", PlayerController.create);
route.patch("/:id/takeDamage", PlayerController.takeDamage);
route.patch("/:id/gainXp", PlayerController.addExperience);

export default route;