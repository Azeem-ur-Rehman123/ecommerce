import data from '../models/productSchema.js';
export const getData = async (req, res) => {
  try {
    res.status(200).send('Data has Send ');
  } catch (e) {
    res.status(500).send(e);
  }
};
export const postData = async (req, res) => {
  try {
    const { _id, rating, name, comment } = req.body;
    const reviewData = { rating, name, comment };
    const myData = await data.findOneAndUpdate(
      { _id: _id },
      { $push: { reviews: reviewData } }
    );
    console.log(myData);

    const response = await myData.reviews.push([rating, name, comment]);
    if (response) {
      res.status(201).json({ message: 'review has successfully pushed' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
