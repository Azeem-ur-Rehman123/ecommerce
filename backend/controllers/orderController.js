import dataUser from '../models/usersSchema.js';
import dataOrder from '../models/OrdersSchema.js';
export const userOrder = async (req, res) => {
  try {
    const { _id } = req.body;
    const allData = await dataOrder.find({ user_ID: _id });
    if (allData) res.status(500).send(allData);
    else res.status(400).json({ message: 'Order not found' });
  } catch (e) {
    res.status(500).send(e);
  }
};
export const getAllOrder = async (req, res) => {
  try {
    const { _id } = req.body;
    const allData = await dataOrder.find();
    if (allData) res.status(500).send(allData);
    else res.status(400).json({ message: 'Order not found' });
  } catch (e) {
    res.status(500).send(e);
  }
};
export const postOrder = async (req, res) => {
  try {
    const myData = new dataOrder(req.body);
    const allData = await myData.save();
    if (allData) res.status(500).json({ message: 'Order successfully' });
  } catch (e) {
    res.status(500).send(e);
  }
};
export const deleteOrder_user = async (req, res) => {
  try {
    const { _id } = req.body;
    const userIdentity = await dataUser.findOne({ _id: _id });

    if (userIdentity) {
      const checkOrder = await dataOrder.findOne({ user_ID: _id });
      if (checkOrder) {
        const deleteOrder = await dataOrder.remove({
          user_ID: _id,
        });
        if (deleteOrder)
          res.status(201).json({ message: 'Order deleted successfully' });
      } else res.status(402).json({ message: 'Order not deleted' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
export const deleteOrder_admin = async (req, res) => {
  try {
    const { _id, order_id } = req.body;
    const userIdentity = await dataUser.findOne({ _id: _id });

    if ((userIdentity.role = 'admin')) {
      const checkOrder = await dataOrder.findOne({ _id: order_id });
      if (checkOrder) {
        const deleteOrder = await dataOrder.remove({
          _id: order_id,
        });
        if (deleteOrder)
          res.status(201).json({ message: 'Order deleted successfully' });
      } else
        res.status(402).json({ message: 'Order not deleted successfully' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
