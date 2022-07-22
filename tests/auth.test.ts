import supertest from "supertest";
import { prisma } from "../config/db.js";

import app from "../src/index.js"
import { createUser } from "./factorys/authFactory.js";

const user = { 
    email: "test@email.com",
    password: "123456"
};

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });

describe("teste de autenticação", () =>{
    
    it("deve retornar 200",async () => {
        await createUser()
        const users = await supertest(app).post("/sign-in").send({email: user.email, password: user.password})
        expect(users.status).toBe(200)
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});