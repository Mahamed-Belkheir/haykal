module.exports.index = () => `import Express from 'express';
import cookieParser from 'cookie-parser';
import router from './api/index';
import err from './error';


export default function(conf: ServerConfig) {
    let app = Express();
    app.use(Express.json())
    app.use(cookieParser("TODO COOKIE SECRET"))

    app.use(err)    
    app.listen(conf.port, () => {
        console.log("server listening at ", conf.port)
    })
}


interface ServerConfig {
    port: string
}`

module.exports.error =  () => `// @ts-ignore
export default function (err:any, req:any, res:any, next:any) {
    let code = err.statusCode || 500;
    if (!err.statusCode)
        console.log(err)
    res.status(code).send({
        status: "error",
        message: err.message,
        validation: err.listOfErrors
    })
}
`

module.exports.router = () => `import { Router } from "express";
import fs from "fs";

const router = Router()

let dirs = fs.readdirSync(__dirname);

for(let dir of dirs) {
    dir = "/" + dir.replace(/.ts/gi, "")
    router.use(dir, require( "." + dir))
}

export default router;`