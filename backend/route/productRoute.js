import express from 'express';
const router = express.Router();
import {
  getData,
  sendData,
  deleteData,
  getById,
  updateData,
} from '../controllers/productController.js';
import { addImage } from '../controllers/imageController.js';
router.get('/', getData);
router.get('/id', getById);

router.post('/', sendData);
router.put('/', updateData);
router.post('/img', addImage);
router.delete('/id', deleteData);
export default router;
