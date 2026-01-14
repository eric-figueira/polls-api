import fastify from 'fastify'
import { z } from 'zod'

const app = fastify()


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

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running')
})
