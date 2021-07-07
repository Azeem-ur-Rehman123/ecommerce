import express from 'express';
const router = express.Router();
import { postData } from '../controllers/registerAuth.js';

router.post('/', postData);
export default router;
