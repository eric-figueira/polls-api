import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import { createPoll } from './routes/create-poll.js'
import { getPoll } from './routes/get-poll.js'
import { voteOnPoll } from './routes/vote-on-poll.js'
import { pollResults } from './websocket/poll-results.js'

const app = fastify()

app.register(cookie, {
  secret: 'polls-api',
  hook: 'onRequest',
})

app.register(websocket)

/**
 * HTTP Routes
 */
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

/**
 * WebSocket
 */
app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP server running')
})
