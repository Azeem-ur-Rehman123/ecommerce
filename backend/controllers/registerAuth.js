import data from '../models/usersSchema.js';
export const postData = async (req, res) => {
  const { name, email, role, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.status(422).json({ error: 'password is not matched' });
  }
  try {
    const myData = new data(req.body);
    console.log(myData);
    const check = await myData.save();
    if (check) {
      res.status(201).send('Data has Send ');
    }

    // .then(() => res.status(201).send('Data has Send '))
    // .catch((e) => res.status(500).json({ error: 'data not send' + e }));
  } catch (e) {
    res.status(500).json({ error: 'data not send' + e });
  }
};
