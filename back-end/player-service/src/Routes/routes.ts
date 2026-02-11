import { Router } from "express"
import { PlayerController } from "../Controller/playerController.js";

const route = Router();
route.post("/", PlayerController.create);
route.patch("/:id/takeDamage", PlayerController.takeDamage);
route.patch("/:id/gainXp", PlayerController.addExperience);
route.patch("/:id/revive", PlayerController.revive);
route.patch("/:id/reroll", PlayerController.reroll);

export default route;