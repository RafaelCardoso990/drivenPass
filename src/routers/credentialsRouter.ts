import { Router } from "express"
import { createCredential, deleteCredential, getCredential } from "../controllers/credentialsController.js"
import { validateToken } from "../middlewares/validateToken.js"

const credentialsRouter = Router()

credentialsRouter.post("/create/credentials", validateToken, createCredential)
credentialsRouter.get("/credentials", validateToken, getCredential)
credentialsRouter.get("/credentials/:id", validateToken, getCredential)
credentialsRouter.delete("/credentials/:id", validateToken, deleteCredential)

export default credentialsRouter