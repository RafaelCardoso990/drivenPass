import bcrypt from "bcrypt"

import userRepository from "../repositories/userRepository.js"

import {Users} from "@prisma/client" 

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

export default {createUser}