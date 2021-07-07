import data from '../models/productSchema.js';
export const getData = async (req, res) => {
  const allData = await data.find();
  try {
    res.status(200).send(allData);
  } catch (e) {
    res.status(500).send(e);
  }
};
export const sendData = async (req, res) => {
  try {
    const myData = new data(req.body);
    const allData = await myData.save();
    res.status(201).send('Data has Send ');
  } catch (e) {
    res.status(500).send(e);
  }
};
export const deleteData = async (req, res) => {
  try {
    const deletePost = await data.remove({ _id: req.params.deletepost });
    res.status(201).send('Data has deleted ');
  } catch (e) {
    res.status(500).send(e);
  }
};
