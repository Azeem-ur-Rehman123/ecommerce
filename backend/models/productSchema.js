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
  photo: {
    type: String,
  },
  reviews: [
    {
      rating: {
        type: Number,
        min: 0,
        max: 5,
        required: [true, 'Ratting is required'],
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

const product = new mongoose.model('product', mySchema);
export default product;
