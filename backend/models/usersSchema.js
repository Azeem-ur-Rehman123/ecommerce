import mongoose from 'mongoose';
import validator from 'validator';

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
    maxlength: 16,
    require: [true, 'Password is required'],
  },
  isActive: {
    type: Boolean,
    trim: true,
    default: false,
  },
});

const user = new mongoose.model('user', mySchema);
export default user;
