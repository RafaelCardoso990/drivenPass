import { Router } from "express"
import { createUser } from "../controllers/usersController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemas.js"
import { signUpSchema } from "../schemas/authSchemas.js"

const userRouter = Router()

userRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema),createUser)

export default userRouter