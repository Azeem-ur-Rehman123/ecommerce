import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose
  .connect(process.env.db_Key, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log('Database not connected'));
