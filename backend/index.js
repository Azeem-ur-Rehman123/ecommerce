import express from 'express';
const app = express();
import './config/connection.js';
import loginRoute from './route/loginRoute.js';
import registerRoute from './route/registerRoute.js';
import productRoute from './route/productRoute.js';
import reviewRoute from './route/reviewRoute.js';
import orderRoute from './route/orderRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import fileUpload from 'express-fileupload';
const port = process.env.PORT || process.env.PORT;
// midlwares

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//routing
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/products', productRoute);
app.use('/api/review', reviewRoute);
app.use('/api/order', orderRoute);
//test
app.get('/app', (req, res) => {
  res.send('function get');
});
app.listen(port, () => {
  console.log(`App is running on the port ${process.env.PORT}`);
});
