const express = require('express');
const userRouter = require('./user');
const adminRouter = require('./admin');
const productRouter = require('./product');
const orderRouter = require('./order');

const router = express.Router();

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);

module.exports = router;
