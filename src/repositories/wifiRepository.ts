import { prisma } from "../../config/db.js"
import { wifiTypeData } from "../services/wifiService.js";

async function insertWifi(wifiData: wifiTypeData){
    await prisma.wifi.create({
        data: wifiData
    })
}

async function getWifi(id: number){
    return await prisma.wifi.findMany({
        where:{
            userId: id
        }
    })
}

async function getWifiById(id: number){
    return await prisma.wifi.findFirst({
        where:{
            id: id
        }
    })
}

async function checkWifiById(wifiId: number, userId: number){
    return await prisma.wifi.findFirst({
        where:{
            id: wifiId,
            userId: userId    
        }
    })
}

async function deleteWifiById(wifiId: number) {
    await prisma.wifi.delete({
        where:{
            id: wifiId
        }
    })    
}

export default {
    insertWifi,
    getWifi,
    getWifiById,
    checkWifiById,
    deleteWifiById
}