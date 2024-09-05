import awsLambdaFastify from '@fastify/aws-lambda'
import routes from './routes.mjs'
import Fastify from 'fastify'

const server = Fastify({
    logger: true,
});

routes(server)

// https://github.com/fastify/aws-lambda-fastify
export const handler = awsLambdaFastify(server);
export const logger = server.log

await server.ready();
