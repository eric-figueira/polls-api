import type { FastifyInstance } from "fastify";
import z from "zod";
import { randomUUID } from "node:crypto"

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, response) => {
    const voteOnPollParams = z.object({ pollId: z.uuid() })
    const voteOnPollBody   = z.object({ pollOptionId: z.uuid() })

    const { pollId }       = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      response.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      })
    }

    return response.status(201).send()
  })
}