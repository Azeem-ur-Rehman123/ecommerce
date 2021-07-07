import express from 'express';
const router = express.Router();
import { getData, postData } from '../controllers/reviewAuth.js';

router.get('/', getData);
router.post('/', postData);
export default router;
