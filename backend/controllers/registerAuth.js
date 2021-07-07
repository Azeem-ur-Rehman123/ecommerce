import data from '../models/usersSchema.js';
export const postData = async (req, res) => {
  try {
    const myData = new data(req.body);
    console.log(myData);
    const allData = await myData.save();
    res.status(201).send('Data has Send ');
  } catch (e) {
    res.status(500).send(e);
  }
};
