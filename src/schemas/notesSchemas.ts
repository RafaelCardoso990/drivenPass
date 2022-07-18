import joi from "joi"
import { notesTypeData } from "../services/notesService.js"

export const createNotes = joi.object<notesTypeData>({
    title: joi.string().required().max(50),
    annotation: joi.string().required().max(1000),
})