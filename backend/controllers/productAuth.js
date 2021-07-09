import data from '../models/productSchema.js';
export const getData = async (req, res) => {
  const allData = await data.find();
  try {
    res.status(200).send(allData);
  } catch (e) {
    res.status(500).send(e);
  }
};
export const getById = async (req, res) => {
  try {
    const { _id } = req.body;
    const allData = await data.findOne({ _id: _id });
    if (allData) res.status(200).send(allData);
    else res.status(400).json({ message: 'data not found' });
  } catch (e) {
    res.status(500).send(e);
  }
};
export const sendData = async (req, res) => {
  try {
    const myData = new data(req.body);
    const allData = await myData.save();
    if (allData)
      res.status(201).json({ message: 'data has send successfully', allData });
  } catch (e) {
    res.status(500).send(e);
  }
};
export const deleteData = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await data.findOne({ _id, _id });
    if (product) {
      const deleteProduct = await data.remove({ _id: _id });
      if (deleteProduct) {
        res.status(202).json({ message: 'product deleted successfully' });
      }
    } else res.status(500).json({ message: 'product not found' });
  } catch (e) {
    res.status(500).send(e);
  }
};
export const updateData = async (req, res) => {
  try {
    const { _id } = req.body;
    const myBodyData = {
      name: req.body.name,
      price: req.body.price,
      discription: req.body.discription,
      quantity: req.body.quantity,
    };
    const product = await data.findOne({ _id, _id });
    if (product) {
      const myData = await data.findByIdAndUpdate(
        _id,
        myBodyData,
        function (err) {
          if (err)
            res.status(500).json({ message: 'product not updated', err });
          else
            res.status(500).json({ message: 'product updated successfully' });
        }
      );
    } else {
      res.status(500).json({ message: 'product not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
