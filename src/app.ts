import Fastify from "fastify"
import db from "./plugins/db.js"
import auth from "./plugins/auth.js"
import authRoutes from "./routes/auth.js"
import jobRoutes from "./routes/jobs.js"
import { jobSchema } from "./schemas/job.schema.js"

const app = Fastify({ logger: true })

// register schemas
app.addSchema(jobSchema)

// plugins
app.register(db)
app.register(auth)

// routes
app.register(authRoutes, { prefix: "/auth" })
app.register(jobRoutes, { prefix: "/jobs" })

// health check
app.get("/health", async () => {
  return { status: "ok" }
})

// global error handler
app.setErrorHandler((error, request, reply) => {
  request.log.error(error)

   const err = error as any 

  reply.status(err.statusCode || 500).send({
    error: "Internal Server Error",
    message: err.message
  })
})

export default app