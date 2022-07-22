import { prisma } from "../../config/db.js";
import bcrypt from "bcrypt"

export async function createUser () {
    const user = {     
      email: "test@email.com",
      password: "123456"
    };
  
    const insertedUser = await prisma.users.create({
          data: {              
              email: user.email,
              password: bcrypt.hashSync(user.password, 10)
          }
      });
  
    return insertedUser;
  } 