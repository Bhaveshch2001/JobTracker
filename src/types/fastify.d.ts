

import "fastify"
import { PrismaClient } from "@prisma/client"

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient
    authenticate: any
  }

  interface FastifyRequest {
    user: {
      id: number
    }
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: number
    }
    user: {
      id: number
    }
  }
}