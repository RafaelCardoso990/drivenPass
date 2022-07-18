import { Router } from "express"
import { createWifi, deleteWifi, getWifis } from "../controllers/wifiController.js"
import { validateToken } from "../middlewares/validateToken.js"

const wifiRouter = Router()

wifiRouter.post("/wifi", validateToken, createWifi)
wifiRouter.get("/wifi", validateToken, getWifis)
wifiRouter.get("/wifi/:id", validateToken, getWifis)
wifiRouter.delete("/wifi/:id", validateToken, deleteWifi)

export default wifiRouter