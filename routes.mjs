import lambda, { FastifyHandler } from './src/index.js'

export default function routes(fastify) {
  fastify.get('/', async function handler(request, reply) {
    return lambda(request, reply, FastifyHandler)
  })

  // aws lambda
  fastify.get('/mosaic-generator', async function handler(request, reply) {
    return lambda(request, reply, FastifyHandler)
  })
}
