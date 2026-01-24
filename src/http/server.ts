import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { createPoll } from './routes/create-poll.js'
import { getPoll } from './routes/get-poll.js'
import { voteOnPoll } from './routes/vote-on-poll.js'

const app = fastify()

app.register(cookie, {
  secret: 'polls-api',
  hook: 'onRequest',
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running')
})
