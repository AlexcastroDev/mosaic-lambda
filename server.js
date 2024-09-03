import Fastify from 'fastify'
import lambda from './src/handlers/handler.js'
import { FastifyHandler } from './src/handlers/fastify.js'

const fastify = Fastify({
  logger: true,
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
  return lambda(request, reply, FastifyHandler)
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
