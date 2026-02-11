import { Router } from "express"
import { PlayerController } from "../Controller/playerController.js";

const route = Router();
route.post("/", PlayerController.create);

export default route;