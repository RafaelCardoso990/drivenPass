import { Router } from "express"
import { createDocument, deleteDocument, getDocuments } from "../controllers/documentController.js"


import { validateToken } from "../middlewares/validateToken.js"

const documentsRouter = Router()

documentsRouter.post("/documents", validateToken, createDocument)
documentsRouter.get("/documents", validateToken, getDocuments)
documentsRouter.get("/documents/:id", validateToken, getDocuments)
documentsRouter.delete("/documents/:id", validateToken, deleteDocument)

export default documentsRouter