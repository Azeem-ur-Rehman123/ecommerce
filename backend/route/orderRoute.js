import express from 'express';
const router = express.Router();
import {
  userOrder,
  getAllOrder,
  postOrder,
  deleteOrder_user,
  deleteOrder_admin,
} from '../controllers/orderAuth.js';

router.get('/user/', userOrder);
router.get('/admin/', getAllOrder);
router.post('/user/', postOrder);
router.delete('/user/', deleteOrder_user);
router.delete('/admin/', deleteOrder_admin);
export default router;
