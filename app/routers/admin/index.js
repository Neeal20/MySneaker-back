const express = require('express');
const adminController = require('../../controllers/admin/adminController');
const middlewareAuth = require('../../middleware/auth/middlewareAuth');

const adminRouter = express.Router();

// route to create a product
adminRouter.post('/products', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.createProduct);

// route to hide a product
adminRouter.patch('/products/:id([0-9]+)', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.hideProduct);

// route to modify a product
adminRouter.patch('/products/update/:id', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.updateProduct);

// route to display all the commands
adminRouter.get('/order', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.getAllOrder);

// route to display one command
adminRouter.get('/order/:id', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.getOneOrder);

module.exports = adminRouter;
