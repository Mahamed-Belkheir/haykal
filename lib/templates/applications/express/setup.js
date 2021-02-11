const expressIndex = () => (`import Express from 'express';
import routers from './api';
import errorHandler from './error';
import { config } from '../../dependency/config';

const server = Express();
const port = config.server.port;
    
server.use(Express.json())

server.use('/api', routers);

server.use(errorHandler)

if (require.main === module) {
    server.listen(port, ()=> console.log("server started listening at " + port));
}
export default server
`);

const expressError = () => (`
// @ts-ignore
export default function (err:any, req:any, res:any, next:any) {
    let code = err.statusCode || 500;
    res.status(code).send({
        status: "error",
        message: err.message,
        validation: err.listOfErrors
    })
}
`);

const expressRouter = () => (`import { Router } from "express";
import fs from "fs";

const router = Router()

let dirs = fs.readdirSync(__dirname);

for(let dir of dirs) {
    dir = "/" + dir.replace(/(\.ts)$|(\.js)$/gi, "")
    if (dir.includes(".map"))
        continue
    let r = require( "." + dir);
    if (typeof r.default == "function")
        router.use(dir, r.default)
}

export default router;`);


module.exports = {
    expressIndex,
    expressError,
    expressRouter,
}