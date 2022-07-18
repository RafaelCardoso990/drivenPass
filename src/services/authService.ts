import {Users} from "@prisma/client" 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import userRepository from "../repositories/authRepository.js"


dotenv.config()

export type CreateUserData = Omit<Users, "id">

async function createUser(user: CreateUserData){    
    
    const encryptedPassword = bcrypt.hashSync(user.password, 10)

    const userData = {
        email: user.email,
        password: encryptedPassword
    }

    const existedEmail = await userRepository.checkEmail(userData)

    if(existedEmail) throw { status: 409, message: 'E-mail already registered' }

    await userRepository.insertUser(userData)
    
}

async function logUser(user: CreateUserData){
    const usersData = await userRepository.checkEmail(user)
   
    if(!usersData) throw { status: 404, message: 'E-mail not found' }

    const decryptedPassowrd = await bcrypt.compare(user.password, usersData.password)   

    if(decryptedPassowrd === false) throw { status: 404, message: 'Wrong password' }

    const token = jwt.sign({ email: usersData.email, id: usersData.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
    return token
}

export default {
    createUser,
    logUser
}