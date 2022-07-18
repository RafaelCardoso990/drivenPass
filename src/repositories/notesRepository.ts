import { prisma } from "../../config/db.js";

import { notesTypeData } from "../services/notesService.js";

async function insertNote(notes: notesTypeData) {
    await prisma.notes.create({
        data: notes
    })
}

async function getNotes(id: number){
    return await prisma.notes.findMany({
        where:{
            userId: id
        }
    })
}

async function getNoteById(id: number){
    return await prisma.notes.findFirst({
        where:{
            id: id
        }
    })
}

async function deleteNoteById(noteId: number) {
    await prisma.notes.delete({
        where:{
            id: noteId
        }
    })
    
}

async function checkNoteById(noteId: number, userId: number){
    return await prisma.notes.findFirst({
        where:{
            id: noteId,
            userId: userId    
        }
    })
}

async function checkNoteByTitle(title: string, userId: number){
    
    return await prisma.notes.findFirst({
        where:{
            title,
            userId        
        }
    })
}

export default {
    insertNote,
    getNotes,
    getNoteById,
    deleteNoteById,
    checkNoteById,
    checkNoteByTitle
}