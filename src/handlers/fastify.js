export class FastifyHandler {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  setHeader(value) {
    this.res.type(value)
  }

  reply(status, body) {
    if(Buffer.isBuffer(body)) {
      this.res.type('application/json')
      this.res.status(status).send({ body: Buffer.from(body).toString('base64'), isBase64Encoded: true})
    } else {
      this.res.status(status).send(body)
    }
  }
}
