import { Router } from "express"
import { createNote, deleteNote, getNotes } from "../controllers/notesController.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemas.js"
import { validateToken } from "../middlewares/validateToken.js"
import { createNotes } from "../schemas/notesSchemas.js"

const notesRouter = Router()

notesRouter.post("/notes", validateToken, validateSchemaMiddleware(createNotes), createNote)
notesRouter.get("/notes", validateToken, getNotes)
notesRouter.get("/notes/:id", validateToken, getNotes)
notesRouter.delete("/notes/:id",validateToken, deleteNote)

export default notesRouter