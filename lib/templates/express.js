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