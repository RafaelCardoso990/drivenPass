import {Cards, cardType} from "@prisma/client"
import Cryptr from "cryptr"

import cardsRepository from "../repositories/cardsRepository.js";

export type CardsTypeData = Omit<Cards, "id">

const cryptr = new Cryptr('myTotallySecretKey');

async function createCards(cards: CardsTypeData, id: number){
    
    const encryptedCvv = cryptr.encrypt(cards.cvv)    

    const encryptedPassword = cryptr.encrypt(cards.password)    

    const carsData = {
        title: cards.title,
        number: cards.number,       
        printName: cards.printName,
        cvv: encryptedCvv,
        expirationDate: cards.expirationDate,
        password: encryptedPassword,
        isVirtual: cards.isVirtual,
        type: cards.type,
        userId: id
    }

    await checkCardByTitle(cards, id) 

    await cardsRepository.insertCards(carsData)
}

async function checkCardByTitle(card: CardsTypeData, id: number){
    const cardData = await cardsRepository.checkCardByTitle(card.title, id)
    if(cardData) throw { status: 409, message: 'Title already used' }
    

}
async function checkCardsById(userId: number, cardId: number) {
    const cards = await cardsRepository.checkCardById(cardId, userId)
    if(!cards) throw { status: 404, message: 'Card not found' }    
}

async function getCards(id: number){
    const result = await cardsRepository.getCards(id)        
    return result
    
}

async function getCardsById(id: number){
    const result = await cardsRepository.getCardsById(id)      
    return result
}

async function deleteCardById(cardId: number) {
    await cardsRepository.deleteCardById(cardId)
}

export default {
    createCards,
    getCards,
    getCardsById,
    deleteCardById,
    checkCardsById,
    checkCardByTitle,
    
}