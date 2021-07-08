import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const mySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
  },
  email: {
    type: String,
    require: [true, 'User Email is required'],
    unique: [true, 'User Email is already exist'],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    },
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  password: {
    type: String,
    minlength: 4,

    require: [true, 'Password is required'],
  },
  cpassword: {
    type: String,
    minlength: 4,

    require: [true, 'Password is required'],
  },

  isActive: {
    type: Boolean,
    trim: true,
    default: false,
  },
});

mySchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});
mySchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

    return token;
  } catch (err) {
    console.log(err);
  }
};

const user = new mongoose.model('user', mySchema);
export default user;
