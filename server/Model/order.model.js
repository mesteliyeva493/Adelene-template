const mongoose = require('mongoose');
const orderSchema = require('../Schemas/order.schema');

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;