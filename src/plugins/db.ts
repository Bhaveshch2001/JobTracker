
import fp from "fastify-plugin"
import { PrismaClient } from "@prisma/client"

// DB connection Instance
const prisma  = new PrismaClient()

export default fp(async (fastify) => {
    fastify.decorate("db" , prisma)

    fastify.addHook("onClose" , async() => {
        await prisma.$disconnect()
    })
})