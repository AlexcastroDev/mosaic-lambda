import awsLambdaFastify from '@fastify/aws-lambda'
import app from '../server.js'

// https://github.com/fastify/aws-lambda-fastify
export const handler = awsLambdaFastify(app)
await app.ready()