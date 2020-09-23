module.exports.index = () => `import Express from 'express';
import router from './api/index';
import err from './error';

let app = Express();
app.use(Express.json());
app.use("/api", router);
app.use(err);


const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
    console.log("server listening at ", PORT)
})
`

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
    dir = "/" + dir.replace(/.js|.ts/gi, "")
    if (dir.includes(".map"))
        continue
    let r = require( "." + dir);
    if (typeof r.default == "function")
        router.use(dir, r.default)
}

export default router;`