import type { FastifyInstance } from "fastify"
import bcrypt from "bcrypt"
import { authSchema } from "../schemas/auth.schema.js"


export default async function (fastify: FastifyInstance) {

  //  SIGNUP
  fastify.post("/signup", { schema: authSchema }, async (request, reply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    const existingUser = await fastify.db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return reply.code(400).send({
        error: "User already exists"
      })
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await fastify.db.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    const token = fastify.jwt.sign(
      { id: user.id },
      { expiresIn: "24h" }
    )

    return reply.code(201).send({
      message: "User created",
      user : user.email,
      token
    })
  })

  //  LOGIN
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    const user = await fastify.db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return reply.code(401).send({ error: "Invalid credentials" })
    }

    const token = fastify.jwt.sign(
      { id: user.id },
      { expiresIn: "24h" }
    )

    return { token }
  })
}