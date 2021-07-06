import express from 'express';
const router = express.Router();
import data from '../models/usersSchema.js';

router.get('/', async (req, res) => {
  const allData = await data.find();
  try {
    res.status(200).send(allData);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.post('/', async (req, res) => {
  try {
    const myData = new data(req.body);
    console.log(myData);
    const allData = await myData.save();
    res.status(201).send('Data has Send ');
  } catch (e) {
    res.status(500).send(e);
  }
});
export default router;
