import Fastify from 'fastify'
import routes from './routes.mjs'

const fastify = Fastify({
  logger: true,
})

routes(fastify)

const { ADDRESS = '0.0.0.0', PORT = '3000' } = process.env;

// Run the server!
try {
  await fastify.listen({ port: PORT, host: ADDRESS })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

export const logger = fastify.log

export default fastify