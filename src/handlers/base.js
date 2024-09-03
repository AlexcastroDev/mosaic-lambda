export class BaseHandler {
  handler

  constructor(req, res, HandlerConstructor) {
    this.handler = new HandlerConstructor(req, res)
  }

  reply(status, body) {
    this.handler.reply(status, body)
  }

  type(value) {
    this.handler.setHeader(value)
  }
}
