 import { Request, Response } from "express"

 import documentService from "../services/documentService.js"


 export async function createDocument(req: Request, res: Response){
     const Documents = req.body    
     const user = res.locals.user     
    
     console.log(Documents)
     await documentService.insertDocuments(Documents, user.id)

     res.sendStatus(201)
 }

export async function getDocuments(req: Request, res: Response){
    const user = res.locals.user
    const id: string = req.params.id
    
    if(!id){             
        const credentials = await documentService.getDocuments(user.id)
        return res.status(200).send(credentials)        
    }

    await documentService.checkDocumentsById(user.id, parseInt(id))

    const Documents = await documentService.getDocumentsById(parseInt(id))
    return res.status(200).send(Documents)

}

export async function deleteDocument(req: Request, res: Response) {
    const user = res.locals.user
    const id: string = req.params.id   

    await documentService.checkDocumentsById(user.id, parseInt(id))

    await documentService.deleteDocumentsById(parseInt(id))

    return res.status(200).send("Document successfully deleted")
}