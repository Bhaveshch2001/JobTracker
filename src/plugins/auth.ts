import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { ENV } from "../utils/env.js";

export default fp(async (fastify) => {
  fastify.register(jwt, {
    secret: ENV.JWT_SECRET,
    sign: { expiresIn: "24h" },
  });


  fastify.decorate("authenticate", async (request: any, reply: any) => {
    try {
      await request.jwtVerify();

    } catch (error :any) {
      
       if (error.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED") {
      return reply.code(401).send({
        error: "Token expired"
      });
    }

      return reply.code(401).send({
        error: "Unauthorized",
        message: "Invalid or missing token",
      });
    }
  });
});