import { Request, Response } from "express"
import cardsServices from "../services/cardsServices.js"


export async function createCards(req: Request, res: Response){
    const cards = req.body
    const user = res.locals.user     


  
    await cardsServices.createCards(cards, user.id)

    res.sendStatus(201)
}

 export async function getCards(req: Request, res: Response){
     const user = res.locals.user
     const id: string = req.params.id
    
     if(!id){             
         const cards = await cardsServices.getCards(user.id)
         return res.status(200).send(cards)        
     }

     await cardsServices.checkCardsById(user.id, parseInt(id))

     const notes = await cardsServices.getCardsById(parseInt(id))
     return res.status(200).send(notes)

 }

 export async function deleteCard(req: Request, res: Response) {
     const user = res.locals.user
     const id: string = req.params.id   

     await cardsServices.checkCardsById(user.id, parseInt(id))

     await cardsServices.deleteCardById(parseInt(id))

     return res.status(200).send("Note successfully deleted")
 }