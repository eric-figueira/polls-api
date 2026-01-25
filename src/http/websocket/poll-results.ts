import type { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub.js";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    const getPollParams = z.object({
      pollId: z.uuid()
    })

    const { pollId } = getPollParams.parse(request.params)

    voting.subscribe(pollId, (message) => {
      connection.send(JSON.stringify(message))
    })
  })
}
