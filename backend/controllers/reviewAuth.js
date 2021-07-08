import data from '../models/reviewsSchema.js';
export const getData = async (req, res) => {
  const allData = await data.find();
  try {
    res.status(200).send(allData);
  } catch (e) {
    res.status(500).send(e);
  }
};
export const postData = async (req, res) => {
  try {
    const { rating, name, comment } = req.body;
    const token = await userLogin();
    res.status(201).send('Data has Send ');
  } catch (e) {
    res.status(500).send(e);
  }
};
