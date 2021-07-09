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
        required: [true, 'Ratting field is required'],
      },
      name: {
        type: String,
        required: [true, 'name field is required'],
      },
      comment: {
        type: String,
        required: [true, 'comment field is required'],
      },
    },
  ],
});
// mySchema.methods.userReview = async function () {
//   try {
//     console.log('ok');
//     this.reviews = this.reviews.concat({
//       rating: rating,
//       name: name,
//       comment: comment,
//     });
//     await this.save();
//   } catch (err) {
//     console.log(err);
//   }
// };

const product = new mongoose.model('product', mySchema);
export default product;
