import lambda, { FastifyHandler } from './src/index.js'

export default function routes(fastify) {
  fastify.get('/', async function handler(request, reply) {
    return lambda(request, reply, FastifyHandler)
  })
}