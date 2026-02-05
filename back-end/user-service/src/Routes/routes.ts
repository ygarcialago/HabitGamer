import { Router } from "express"
import { ValidateBody } from "../Middleware/validate.js";
import { createUserSchema } from "../DTO/createUser.dto.js";
import { loginUserSchema } from "../DTO/loginUser.dto.js";
import { UserController } from "../Controllers/userController.js";

const route = Router();

route.post("/create", ValidateBody(createUserSchema), UserController.save)
route.post("/login", ValidateBody(loginUserSchema), UserController.login)

export default route;