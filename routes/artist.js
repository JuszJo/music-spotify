import { Router } from 'express';
const router = Router();
import { get } from '../controllers/artistController.js';

router.get('/artist', get)

export default router;