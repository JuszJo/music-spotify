import { Router } from 'express';
const router = Router();

router.get('/welcome', (req, res) => {
    res.render('pages/welcome')
})

export default router;