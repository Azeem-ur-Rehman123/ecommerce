import express from 'express';
const router = express.Router();
import {
  checkAuth,
  sendEmail,
  resetPassword,
  sendOTP,
} from '../controllers/loginController.js';

router.post('/', checkAuth);

router.put('/forgot', sendEmail);

router.post('/reset', resetPassword);
router.post('/otp', sendOTP);
export default router;
