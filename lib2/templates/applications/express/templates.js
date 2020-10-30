const expressDefaultRouter = () => (`import { Router } from "express";

const router = Router()

//@ts-ignore
router.get('/', async (req, res, next) => {
    try {
        
        })
    } catch (e) {
        next(e)
    }
})

export default router;`);

const expressResourceRouter = (resource) => (``);


module.exports = {
    expressDefaultRouter,
    expressResourceRouter,
}