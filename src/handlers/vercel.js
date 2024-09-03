export class VercelHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    type(value) {
        this.res.setHeader('Content-Type', value);
    }

    reply(status, body) {
        this.res.status(status).send(body);
    }
}