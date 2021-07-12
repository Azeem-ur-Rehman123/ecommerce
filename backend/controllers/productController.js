import data from '../models/productSchema.js';
import cloudinary from 'cloudinary';
cloudinary.v2;
import '../midlewares/cloudinaryConfig.js';
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
    // const myData = new data(req.body);

    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, async (result, error) => {
      const myBodyData = new data({
        name: req.body.name,
        price: req.body.price,
        discription: req.body.discription,
        quantity: req.body.quantity,
        photos: result.url,
      });
      const allData = await myBodyData.save();
      if (allData)
        res
          .status(201)
          .json({ message: 'data has send successfully', allData });
    });
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

    const product = await data.findOne({ _id, _id });
    if (product) {
      const file = req.files.photo;
      cloudinary.uploader.upload(file.tempFilePath, async (result, error) => {
        const myBodyData = {
          name: req.body.name,
          price: req.body.price,
          discription: req.body.discription,
          quantity: req.body.quantity,
          photos: result.url,
        };
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
      });
    } else {
      res.status(500).json({ message: 'product not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

// export const postData = async (req, res) => {
//   try {
//     const { _id, rating, name, comment } = req.body;
//     const reviewData = { rating, name, comment };
//     const myData = await data.findOneAndUpdate(
//       { _id: _id },
//       { $push: { reviews: reviewData } }
//     );
//     console.log(myData);

//     const response = await myData.reviews.push([rating, name, comment]);
//     if (response) {
//       res.status(201).json({ message: 'review has successfully pushed' });
//     }
//   } catch (e) {
//     res.status(500).send(e);
//   }
// };
