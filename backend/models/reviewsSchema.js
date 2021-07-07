import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
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
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
});

const review = new mongoose.model('review', mySchema);
export default review;
