import express from 'express';
const router = express.Router();
import {
  getData,
  sendData,
  deleteData,
  getById,
  updateData,
} from '../controllers/productAuth.js';

router.get('/', getData);
router.get('/id', getById);

router.post('/', sendData);
router.put('/', updateData);
router.delete('/id', deleteData);
export default router;
