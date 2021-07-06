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
  password: {
    type: String,
    require: [true, 'Password is required'],
  },
});

const user = new mongoose.model('user', mySchema);
export default user;
