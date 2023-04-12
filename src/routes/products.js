const express = require('express');
const api = express.Router();

const productController = require('../controllers/products');

api.get('/product/:id', productController.getProduct);
api.post('/products/:limit?', productController.getProducts);
module.exports = api;