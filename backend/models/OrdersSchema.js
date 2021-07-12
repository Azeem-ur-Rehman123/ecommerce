import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
  user_ID: {
    type: String,
    required: [true, 'User name is required'],
  },
  product_ID: {
    type: String,
    require: [true, 'User Email is required'],
    unique: [true, 'User Email is already exist'],
  },
  quantity: {
    type: String,

    require: [true, 'quantity is required'],
  },

  total_price: {
    type: Number,

    require: [true, 'Price is required'],
  },
  total_tax: {
    type: String,
    require: [true, 'tax is required'],
  },
  mobile: {
    type: String,
    required: [true, 'moble no is required'],
  },
  location: {
    type: String,
    required: [true, 'location is required'],
  },
});

const order = new mongoose.model('order', mySchema);
export default order;
