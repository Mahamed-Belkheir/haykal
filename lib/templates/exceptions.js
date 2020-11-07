const exceptions = () => (`export class AlreadyExists extends Error {
    statusCode = 400
    constructor(){
        super("item already exists")
    }
}

export class NotFound extends Error {
    statusCode = 404
    constructor(item: string) {
        super(item+" not found.");
    }
}
`);

module.exports = exceptions;