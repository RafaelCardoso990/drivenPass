import cors from "cors"
import express, {json} from "express"
import "express-async-errors"
import dotenv from "dotenv"
import router from "./routers/index.js"
import errorHandlerMiddleware from "./middlewares/errorMiddleware.js"


dotenv.config()

const app = express()

app.use(json())
app.use(cors())
app.use(router)
app.use(errorHandlerMiddleware)


app.listen(process.env.PORT, () =>{
    console.log("Server listening on port " + process.env.PORT)
})