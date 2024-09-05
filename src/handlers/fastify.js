export class FastifyHandler {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  setHeader(value) {
    this.res.type(value)
  }

  reply(status, body) {
    this.res.header('Content-Disposition', 'attachment; filename=mosaic.png');
    this.res.header('Content-Length', body.Length);
    this.res.status(status).send(body)
  }
}
