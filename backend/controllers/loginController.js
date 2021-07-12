import data from '../models/usersSchema.js';
import bcrypt from 'bcryptjs';
import { mailer } from '../midlewares/nodeMailer.js';

export const checkAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await data.findOne({ email: email });
    const passMatch = await bcrypt.compare(password, userLogin.password);
    if (!userLogin) {
      res.status(402).json({ error: 'Email or password in incorrect' });
    } else {
      if (passMatch) {
        const token = await userLogin.generateToken();
        console.log(token);
        res.cookie({
          expire: Math.floor(Date.now() / 1000) + 60 * 60,
          httpOnly: true,
        });
        res.status(201).json({ message: 'User login successfully' });
      } else res.status(402).json({ error: 'Email or password is incorrect' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUser = await data.findOne({ email: email });
    if (checkUser) {
      const otpCode = Math.floor(Math.random() * 10000 + 1);

      const myBodyData = {
        code: otpCode,
        expireIn: new Date().getTime() + 300 * 1000,
      };
      const myData = await data.findByIdAndUpdate(
        checkUser._id,
        myBodyData,
        function (err) {
          if (err) res.status(500).json({ message: 'otp not updated', err });
          else {
            mailer(email, otpCode);
            res.status(200).json({ message: 'Please check your email' });
          }
        }
      );
    } else {
      res.status(200).json({ message: 'email notsend', email });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;
    const myBodyData = {
      password: password,
      cpassword: cpassword,
    };
    const userAvailable = await data.findOne({ email: email });
    if (userAvailable) {
      userAvailable.password = password;
      const pro = await userAvailable.save();
      if (pro) {
        res.status(201).json({ error: 'send' });
      } else res.status(500).json({ error: 'not send' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
export const sendOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const findUser = await data.findOne({ email: email });
    if (findUser) {
      const currentTime = new Date().getTime();
      const diff = currentTime - findUser.expireIn;
      if (findUser.code === otp && diff < 0) {
        res.status(200).json({ messsage: 'you can reset your password' });
      } else res.status(400).json({ messsage: 'wrong' });
    } else res.status(400).json({ messsage: 'user not found' });
  } catch (e) {}
};
