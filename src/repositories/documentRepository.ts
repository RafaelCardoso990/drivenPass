import { prisma } from "../../config/db.js"

import { documentTypeData } from "../services/documentService.js" 

async function insertDocuments(documentData: documentTypeData){
    await prisma.documents.create({
        data: documentData
    })
}


async function getDocument(id: number){
    return await prisma.documents.findMany({
        where:{
            userId: id
        }
    })
}

async function getDocumentById(id: number){
    return await prisma.documents.findFirst({
        where:{
            id: id
        }
    })
}

async function checkDocumentById(documentId: number, userId: number){
    return await prisma.documents.findFirst({
        where:{
            id: documentId,
            userId: userId    
        }
    })
}

async function deleteDocumentById(documentId: number) {
    await prisma.documents.delete({
        where:{
            id: documentId
        }
    })    
}

export default {
    insertDocuments,
    getDocument,
    getDocumentById,
    checkDocumentById,
    deleteDocumentById
}