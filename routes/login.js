import { Router } from 'express';
const router = Router();
import { loginHandler } from '../controllers/authController.js';

router.get('/login', (req, res) => {
    res.render('pages/login');
})

router.post('/login', loginHandler)

export default router;