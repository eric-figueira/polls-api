import z from 'zod'
import { prisma } from '../../lib/prisma.js'
import type { FastifyInstance } from 'fastify'

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, response) => {
    const createPollBodySchema = z.object({
      title: z.string(),
    })

    const { title } = createPollBodySchema.parse(request.body)

    const poll = await prisma.poll.create({
      data: {
        title,
      }
    })

    return response.status(201).send({ pollId: poll.id })
  })
}