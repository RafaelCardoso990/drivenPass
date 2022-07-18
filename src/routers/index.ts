import { Router } from "express"

import userRouter from "./authRouter.js"
import cardsRouter from "./cardsRouter.js"
import credentialsRouter from "./credentialsRouter.js"
import notesRouter from "./notesRouter.js"
import wifiRouter from "./wifiRouter.js"

const router = Router()

router.use(userRouter)
router.use(credentialsRouter)
router.use(notesRouter)
router.use(cardsRouter)
router.use(wifiRouter)

export default router