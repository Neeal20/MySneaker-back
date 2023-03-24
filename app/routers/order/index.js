const express = require('express');
const orderController = require('../../controllers/order/orderController');
const middlewareAuth = require('../../middleware/auth/middlewareAuth');

const router = express.Router();

// route to create an order
router.post('/', middlewareAuth.isLogged, orderController.createOneOrder);

module.exports = router;
