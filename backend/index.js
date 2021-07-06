import express from 'express';
const app = express();
import './config/connection.js';
import usersRoute from './route/usersRoute.js';
import productRoute from './route/productRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || process.env.PORT;
// midlwares

app.use(express.json());
app.use(cors());
//routing
app.use('/api/users', usersRoute);
app.use('/api/products', productRoute);
//test
app.get('/app', (req, res) => {
  res.send('function get');
});
app.listen(port, () => {
  console.log(`App is running on the port ${process.env.PORT}`);
});
