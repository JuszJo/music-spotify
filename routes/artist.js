import { Router } from 'express';
const router = Router();
import { artistHandler } from '../controllers/artistController.js';

router.get('/artist', artistHandler)

export default router;