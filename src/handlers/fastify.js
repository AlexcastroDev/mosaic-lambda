export class FastifyHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    setHeader(value) {
        this.res.type(value);
    }

    reply(status, body) {
        this.res.status(status).send(body);
    }
}