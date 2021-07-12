import express from 'express';
const router = express.Router();
import { getData, postData } from '../controllers/reviewController.js';

router.get('/', getData);
router.post('/', postData);
export default router;
