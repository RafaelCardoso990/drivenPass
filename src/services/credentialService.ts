import { Credentials } from "@prisma/client"
import Cryptr from "cryptr"

import credentialsRepository from "../repositories/credentialsRepository.js"

const cryptr = new Cryptr('myTotallySecretKey');

export type credentialsTypeData = Omit<Credentials, "id">

async function insertCredentials(credential: credentialsTypeData, id: number){
   

    const encryptedString = cryptr.encrypt(credential.password);    
    
    const credentialData = {        
        title: credential.title,
        url: credential.url,
        userName: credential.userName,
        password: encryptedString,
        userId: id
    }

    await checkCrendentialByTitle(credential, id) 

    await credentialsRepository.insertCredentials(credentialData)
}

async function checkCrendentialByTitle(credential: credentialsTypeData, id: number){
    const credentialData = await credentialsRepository.checkCrendentialByTitle(credential.title, id)
    if(credentialData) throw { status: 409, message: 'Title already used' }
    
}

async function checkCredentialById(userId: number, credentialId: number) {
    const credentials = await credentialsRepository.checkCredentialById(credentialId, userId)
    if(!credentials) throw { status: 404, message: 'Credential not found' }    
}

async function getCredentials(id: number){
    const result = await credentialsRepository.getCredentials(id)    
    const credentials = result.map((credential) => {
        const {id, title, url, userName, password, userId} = credential
        const decryptPassword = cryptr.decrypt(password)
        return {id, title, url, userName, decryptPassword, userId}
    })
    return credentials
    
}

async function getCredentialById(id: number){
    const result = await credentialsRepository.getCredentialsById(id)    
    const decryptPassword = cryptr.decrypt(result.password)
    const crendetials = {
        id: result.id,
        title: result.title,
        userName: result.userName,
        url: result.url,
        userId: result.userId,
        password: decryptPassword
        
    }
    return crendetials
}

async function deleteCredentialById(credentialId: number) {
    await credentialsRepository.deleteCredentialById(credentialId)
}

export default {
    insertCredentials,
    checkCrendentialByTitle,
    getCredentials,
    getCredentialById,
    checkCredentialById,
    deleteCredentialById
}