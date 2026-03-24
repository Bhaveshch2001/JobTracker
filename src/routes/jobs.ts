import type { FastifyInstance } from "fastify"
import {
  createJobSchema,
  getJobsSchema,
  getJobByIdSchema,
  updateJobSchema,
  deleteJobSchema
} from "../schemas/job.schema.js"

export default async function (fastify: FastifyInstance) {

  //  GET ALL JOBS (pagination)
  fastify.get("/", {
    schema: getJobsSchema,
    onRequest: [fastify.authenticate]
  }, async (request) => {

    const { page = 1, limit = 20 } = request.query as {
      page?: number
      limit?: number
    }

    return fastify.db.job.findMany({
      where: { assigneeId: request.user.id },
      skip: (page - 1) * limit,
      take: limit
    })
  })


  //  GET SINGLE JOB
  fastify.get("/:id", {
    schema: getJobByIdSchema,
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {

    const { id } = request.params as { id: string }

    const job = await fastify.db.job.findUnique({
      where: { id: Number(id) }
    })

    if (!job) {
      return reply.code(404).send({ error: "Job not found" })
    }

    return job
  })


  //  CREATE JOB
  fastify.post("/", {
    schema: createJobSchema,
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {

    const job = await fastify.db.job.create({
      data: {
        ...(request.body as any),
        assigneeId: request.user.id
      }
    })

    reply.code(201)
    return job
  })


  //  UPDATE JOB 
  fastify.patch("/:id", {
    schema: updateJobSchema,
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {

    const { id } = request.params as { id: string }

    try {
      const job = await fastify.db.job.update({
        where: { id: Number(id) },
        data: request.body as any
      })

      return job

    } catch (err: any) {
      if (err.code === "P2025") {
        return reply.code(404).send({ error: "Job not found" })
      }

      return reply.code(500).send({ error: "Update failed" })
    }
  })


  //  DELETE JOB
  fastify.delete("/:id", {
    schema: deleteJobSchema,
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {

    const { id } = request.params as { id: string }

    try {
      await fastify.db.job.delete({
        where: { id: Number(id) }
      })

      return reply.code(204).send({
      message: "Job deleted successfully"
    })

    } catch (err: any) {
      if (err.code === "P2025") {
        return reply.code(404).send({ error: "Job not found" })
      }

      return reply.code(500).send({ error: "Delete failed" })
    }
  })
}