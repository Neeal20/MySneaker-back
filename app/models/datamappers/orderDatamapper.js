const client = require('../database');

const orderDatamapper = {
  async createOrder(userId) {
    try {
      const preparedQuery = {
        text: `INSERT INTO "order" (id_user)
            VALUES
            ($1)
            RETURNING id;`,
        values: [userId],
      };

      const idOrder = await client.query(preparedQuery);

      return idOrder.rows[0];
    } catch (error) {
      return error;
    }
  },

  async createOrderLine(orderId, product) {
    try {
      const preparedQuery = {
        text: `INSERT INTO "order_line" (id_order, id_product, quantity, size)
             VALUES ($1, $2, $3, $4);`,
        values: [orderId.id, product.id, product.quantity, product.size],
      };
      const result = await client.query(preparedQuery);
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = orderDatamapper;
