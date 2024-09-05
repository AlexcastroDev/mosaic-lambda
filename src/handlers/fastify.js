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
      this.res.type('image/png')
      this.res.header('Content-Length', body.length)
      this.res.status(status).send(Buffer.from(body), 'base64')
    } else {
      this.res.status(status).send(body)
    }
  }
}
