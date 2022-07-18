import { prisma } from "../../config/db.js"

import { credentialsTypeData } from "../services/credentialService.js"

async function insertCredentials(credential: credentialsTypeData){
    await prisma.credentials.create({
        data: credential
    })
}

async function checkCrendentialByTitle(title: string, userId: number){
    
    return await prisma.credentials.findFirst({
        where:{
            title,
            userId        
        }
    })
}

async function checkCredentialById(credentialId: number, userId: number){
    return await prisma.credentials.findFirst({
        where:{
            id: credentialId,
            userId: userId    
        }
    })
}

async function getCredentials(id: number){
    return await prisma.credentials.findMany({
        where:{
            userId: id
        }
    })
}

async function getCredentialsById(id: number){
    return await prisma.credentials.findFirst({
        where:{
            id: id
        }
    })
}

async function deleteCredentialById(credentialId: number) {
    await prisma.credentials.delete({
        where:{
            id: credentialId
        }
    })
    
}

export default {
    insertCredentials,
    checkCrendentialByTitle,
    getCredentials,
    checkCredentialById,
    getCredentialsById,
    deleteCredentialById
}