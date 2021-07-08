import data from '../models/usersSchema.js';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
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
