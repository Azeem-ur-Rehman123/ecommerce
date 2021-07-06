import express from 'express';
const router = express.Router();
import { getData, sendData, deleteData } from '../controllers/productData.js';

router.get('/', getData);

router.post('/', sendData);
router.delete('/:deletepost', deleteData);
export default router;
