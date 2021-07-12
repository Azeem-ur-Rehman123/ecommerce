import data from '../models/productSchema.js';
import cloudinary from 'cloudinary';
cloudinary.v2;
import '../midlewares/cloudinaryConfig.js';
export const addImage = async (req, res) => {
  try {
    const { _id } = req.body;

    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, async (result, error) => {
      const myData = await data.findOneAndUpdate(
        { _id: _id },
        { $push: { photos: result.url } }
      );

      if (myData) {
        res.status(201).json({ message: 'Photo has successfully pushed' });
      }
      if (!myData) {
        res.status(201).json({ message: 'Photo not' });
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'error', e });
  }
};
