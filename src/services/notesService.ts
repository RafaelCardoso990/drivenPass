import { Notes } from "@prisma/client"

import notesRepository from "../repositories/notesRepository.js"

export type notesTypeData = Omit<Notes, "id">

async function insertNote(notes: notesTypeData, id: number){  
    
    const notesData = {        
        title: notes.title,
        annotation: notes.annotation,
        userId: id       
    }
    
    await checkNoteByTitle(notes, id)

    await notesRepository.insertNote(notesData)
}

async function getNotes(id: number) {    
    const result = await notesRepository.getNotes(id)  
    return result
        
}

async function getNoteById(id: number){
    const result = await notesRepository.getNoteById(id)    
    return result
}

async function deleteNoteById(noteId:number) {
    await notesRepository.deleteNoteById(noteId)
}

async function checkNoteById(userId: number, noteId: number) {
    const notes = await notesRepository.checkNoteById(noteId, userId)
    if(!notes) throw { status: 404, message: 'Note not found' }    
}

async function checkNoteByTitle(note: notesTypeData, id: number){
    const noteData = await notesRepository.checkNoteByTitle(note.title, id)
    if(noteData) throw { status: 409, message: 'Title already used' }
    
}

    
export default {
    insertNote,
    getNotes,
    checkNoteById,
    getNoteById,
    deleteNoteById,
    checkNoteByTitle
   
}