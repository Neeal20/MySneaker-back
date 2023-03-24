/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
// const middlewareCart = require('../../middleware/order/middlewareCart');
const orderDatamapper = require('../../models/datamappers/orderDatamapper');

const orderController = {
  async createOneOrder(req, res) {
    const userID = req.user.id;
    const cart = req.body.formatedProducts;
    console.log(cart);
    try {
      const orderId = await orderDatamapper.createOrder(userID);
      cart.map(async (product) => {
        if (!isNaN(product.id) || !isNaN(product.size) || !isNaN(product.quantity)) {
          await orderDatamapper.createOrderLine(orderId, { id: product.id, quantity: product.quantity, size: product.size });
        }
      });
      res.status(200).send('ok');
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = orderController;
