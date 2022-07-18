import { prisma } from "../../config/db.js";

import { CardsTypeData } from "../services/cardsServices.js";

async function insertCards(cards: CardsTypeData) {
    console.log(cards)
    await prisma.cards.create({
        data: cards
    })
}

async function getCards(id: number){
    return await prisma.cards.findMany({
        where:{
            userId: id
        }
    })
}

async function getCardsById(id: number){
    return await prisma.cards.findFirst({
        where:{
            id: id
        }
    })
}

async function checkCardById(cardId: number, userId: number){
    return await prisma.cards.findFirst({
        where:{
            id: cardId,
            userId: userId    
        }
    })
}

async function checkCardByTitle(title: string, userId: number){
    
    return await prisma.cards.findFirst({
        where:{
            title,
            userId        
        }
    })
}

async function deleteCardById(cardId: number) {
    await prisma.cards.delete({
        where:{
            id: cardId
        }
    })
    
}

export default {
    insertCards,
    checkCardById,
    getCards,
    getCardsById,
    deleteCardById,
    checkCardByTitle
}