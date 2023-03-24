const express = require('express');
const productController = require('../../controllers/product/productController');

const productRouter = express.Router();

// route to display all products
productRouter.get('/products', productController.getAllProducts);

// route to display one product
productRouter.get('/products/:id([0-9]+)', productController.productDetails);

module.exports = productRouter;
