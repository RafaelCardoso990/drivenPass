import { Request, Response } from "express"
import notesService from "../services/notesService.js"


export async function createNote(req: Request, res: Response){
    const notes = req.body
    const user = res.locals.user     
  

    await notesService.insertNote(notes, user.id)

    res.sendStatus(201)
}

export async function getNotes(req: Request, res: Response){
    const user = res.locals.user
    const id: string = req.params.id
    
    if(!id){             
        const credentials = await notesService.getNotes(user.id)
        return res.status(200).send(credentials)        
    }

    await notesService.checkNoteById(user.id, parseInt(id))

    const notes = await notesService.getNoteById(parseInt(id))
    return res.status(200).send(notes)

}

export async function deleteNote(req: Request, res: Response) {
    const user = res.locals.user
    const id: string = req.params.id   

    await notesService.checkNoteById(user.id, parseInt(id))

    await notesService.deleteNoteById(parseInt(id))
    
    return res.status(200).send("credential successfully deleted")
}