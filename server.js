import Fastify from 'fastify'
import lambda, { FastifyHandler } from './src/index.js'

const fastify = Fastify({
  logger: true,
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
  return lambda(request, reply, FastifyHandler)
})

const { ADDRESS = '0.0.0.0', PORT = '3000' } = process.env;

// Run the server!
try {
  await fastify.listen({ port: PORT, host: ADDRESS })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

export default fastify