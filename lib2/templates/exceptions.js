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

export class CheckingError extends Error {
    statusCode = 400
    constructor(exists: boolean) {
        super(exists? "user is already checked in" : "no session to check out from")
    }
}

export class failedValidation extends Error {
    statusCode = 400;
    listOfErrors: validationErrors
    constructor(errors: validationErrors) {
        super("Validation Error")
        this.listOfErrors = errors;
    }
}

export function ValidateData(data: any, attributes: {[index:string]: string}) {
    let listOfErrors:validationErrors = {}
    for(let key in attributes) {
        if (typeof data[key] != attributes[key]) 
            listOfErrors[key] = { got: typeof data[key], expected: attributes[key] }
    }
    if (Object.keys(listOfErrors).length > 0) {
        throw new failedValidation(listOfErrors)
    }
}

interface validationErrors {
    [index:string]: {got: string, expected: string}
}`);