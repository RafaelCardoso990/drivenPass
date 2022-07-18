import { Request, Response } from "express"
import credentialService from "../services/credentialService.js"

export async function createCredential(req: Request, res: Response){
    const credential = req.body
    
    const user = res.locals.user    

    await credentialService.insertCredentials(credential, user.id)
    res.sendStatus(201)
}

export async function getCredential(req: Request, res: Response){
    const user = res.locals.user
    const id: string = req.params.id
    
    if(!id){             
        const credentials = await credentialService.getCredentials(user.id)
        return res.status(200).send(credentials)        
    }

    await credentialService.checkCredentialById(user.id, parseInt(id))

    const credentials = await credentialService.getCredentialById(parseInt(id))
    return res.status(200).send(credentials)

}

export async function deleteCredential(req: Request, res: Response) {
    const user = res.locals.user
    const id: string = req.params.id   

    await credentialService.checkCredentialById(user.id, parseInt(id))

    await credentialService.deleteCredentialById(parseInt(id))
    return res.status(200).send("Credential successfully deleted")
}