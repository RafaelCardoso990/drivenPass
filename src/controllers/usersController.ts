import { Request, Response } from "express";
import userServices from "../services/userServices.js";

export async function createUser(req: Request, res: Response) {
    const user = req.body

    await userServices.createUser(user)

    res.sendStatus(201)
    
}