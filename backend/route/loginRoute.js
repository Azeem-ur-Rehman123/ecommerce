import express from 'express';
const router = express.Router();
import { checkAuth } from '../controllers/loginAuth.js';

router.post('/', checkAuth);
export default router;
