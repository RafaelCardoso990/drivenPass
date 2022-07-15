import { prisma } from "../../config/db.js"
import {CreateUserData} from "../services/userServices.js"

async function insertUser(user: CreateUserData) {
    await prisma.users.create({
        data: user
    })
   
}

async function checkEmail(user: CreateUserData) {
    return await prisma.users.findUnique({
        where:{
            email: user.email
        }
    })

}

const userRepository = {
    insertUser,
    checkEmail
}

export default userRepository