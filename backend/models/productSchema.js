import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plaese enter product name'],
  },
  price: {
    type: Number,
    required: [true, 'Plaese enter product price'],
  },
  discription: {
    type: String,
    required: [true, 'Plaese enter product discription'],
  },
  quantity: {
    type: Number,
    required: [true, 'Plaese enter product quantity'],
  },
});

const product = new mongoose.model('product', mySchema);
export default product;
