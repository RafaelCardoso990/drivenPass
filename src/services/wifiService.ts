import { Wifi } from "@prisma/client"
import Cryptr from "cryptr"

import wifiRepository from "../repositories/wifiRepository.js"

const cryptr = new Cryptr('myTotallySecretKey');

export type wifiTypeData = Omit<Wifi, "id">

async function insertWifi(wifi: wifiTypeData, id: number){  
    
    const encryptedPassword = cryptr.encrypt(wifi.password)       

    const wifiData = {        
        title: wifi.title,
        name: wifi.name,
        password: encryptedPassword,
        userId: id       
    }   

    await wifiRepository.insertWifi(wifiData)
}

async function getWifi(id: number) {    
    const result = await wifiRepository.getWifi(id)  
    return result
        
}

 async function getWifiById(id: number){
     const result = await wifiRepository.getWifiById(id)    
     return result
 }

async function deleteWifiById(noteId:number) {
    await wifiRepository.deleteWifiById(noteId)
}

async function checkWifiById(userId: number, noteId: number) {
    const wifi = await wifiRepository.checkWifiById(noteId, userId)
    if(!wifi) throw { status: 404, message: 'Wifi not found' }    
}
    
export default {
    insertWifi,
    getWifi,
    checkWifiById,
    getWifiById,
    deleteWifiById,      
}