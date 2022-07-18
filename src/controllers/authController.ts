import { Request, Response } from "express";
import userServices from "../services/authService.js";

export async function createUser(req: Request, res: Response) {
    const user = req.body

    await userServices.createUser(user)

    res.sendStatus(201)
    
}

export async function logUser(req: Request, res: Response){
    const user = req.body

    const token = await userServices.logUser(user)    
    console.log(token)

    res.status(200).send(token)
}