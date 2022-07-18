import { Request, Response } from "express"
import wifiService from "../services/wifiService.js"


export async function createWifi(req: Request, res: Response){
    const wifis = req.body    
    const user = res.locals.user     
    
    console.log(wifis)
    await wifiService.insertWifi(wifis, user.id)

    res.sendStatus(201)
}

export async function getWifis(req: Request, res: Response){
    const user = res.locals.user
    const id: string = req.params.id
    
    if(!id){             
        const credentials = await wifiService.getWifi(user.id)
        return res.status(200).send(credentials)        
    }

    await wifiService.checkWifiById(user.id, parseInt(id))

    const Wifis = await wifiService.getWifiById(parseInt(id))
    return res.status(200).send(Wifis)

}

export async function deleteWifi(req: Request, res: Response) {
    const user = res.locals.user
    const id: string = req.params.id   

    await wifiService.checkWifiById(user.id, parseInt(id))

    await wifiService.deleteWifiById(parseInt(id))

    return res.status(200).send("Wifi successfully deleted")
}