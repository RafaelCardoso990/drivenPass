import { Router } from "express"
import { createCards, deleteCard, getCards } from "../controllers/cardsController.js"
import { validateToken } from "../middlewares/validateToken.js"



const cardsRouter = Router()

cardsRouter.post("/cards", validateToken, createCards)
cardsRouter.get("/cards", validateToken, getCards)
cardsRouter.get("/cards/:id", validateToken, getCards)
cardsRouter.delete("/cards/:id",validateToken, deleteCard)

export default cardsRouter