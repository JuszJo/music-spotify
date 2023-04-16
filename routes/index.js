import { Router } from 'express';
const router = Router();

router.get('/', (req, res, next) => {
    res.render('pages/index', {val: "Joshua"})
})

export default router;