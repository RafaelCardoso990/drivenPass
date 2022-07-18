import { Documents } from "@prisma/client"

import documentRepository from "../repositories/documentRepository.js";

export type documentTypeData = Omit<Documents, "id">

async function insertDocuments(document: documentTypeData, id: number){       
    
    const documentData = {
        name: document.name,
        number: document.number,
        issueDate: document.issueDate,
        issuingBody: document.issuingBody,
        validity: document.validity,
        userId: id,
        type: document.type
    }

    await checkTypeDocument(document)

    await documentRepository.insertDocuments(documentData)
}

async function checkTypeDocument(document: documentTypeData){
    if(document.type !== "cnh" && document.type !== "rg") throw { status: 401, message: 'Type not authorized' }
    
}

async function getDocuments(id: number) {    
    const result = await documentRepository.getDocument(id)  
    return result
        
}

async function getDocumentsById(id: number){
    const result = await documentRepository.getDocumentById(id)    
    return result
}

async function deleteDocumentsById(noteId:number) {
    await documentRepository.deleteDocumentById(noteId)
}

async function checkDocumentsById(userId: number, noteId: number) {
    const Documents = await documentRepository.checkDocumentById(noteId, userId)
    if(!Documents) throw { status: 404, message: 'Documents not found' }    
}
    
export default {
    insertDocuments,
    getDocuments,
    checkDocumentsById,
    getDocumentsById,
    deleteDocumentsById,      
}