import data from '../models/usersSchema.js';
import cloudinary from 'cloudinary';
cloudinary.v2;
import '../midlewares/cloudinaryConfig.js';
export const postData = async (req, res) => {
  try {
    const { password, cpassword } = req.body;
    const file = req.files.avatar;
    if (password !== cpassword) {
      return res.status(422).json({ error: 'password is not matched' });
    }
    cloudinary.uploader.upload(file.tempFilePath, async (result, error) => {
      const regData = new data({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,

        avatar: result.url,
      });

      const check = await regData.save();
      if (check) {
        res
          .status(201)
          .json({ message: 'user registered successfully', check });
      }
    });

    // .then(() => res.status(201).send('Data has Send '))
    // .catch((e) => res.status(500).json({ error: 'data not send' + e }));
  } catch (e) {
    res.status(500).json({ error: 'data not send' + e });
  }
};
