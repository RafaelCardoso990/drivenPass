import { Router } from "express"
import { createUser, logUser } from "../controllers/authController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemas.js"
import { signInSchema, signUpSchema } from "../schemas/authSchemas.js"

const userRouter = Router()

userRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema),createUser)
userRouter.post("/sign-in", validateSchemaMiddleware(signInSchema),logUser)

export default userRouter