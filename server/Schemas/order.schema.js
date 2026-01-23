// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   customerInfo: {
//     fullName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     note: { type: String }
//   },
//   items: [
//     {
//       productId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product',
//         required: true 
//       },
//       title: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, required: true }
//     }
//   ],
//   totalPrice: { type: Number, required: true },
//   status: { 
//     type: String, 
//     enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
//     default: 'Pending' 
//   },
//   paymentStatus: { 
//     type: String, 
//     enum: ['Unpaid', 'Paid'], 
//     default: 'Unpaid' 
//   },
//   orderDate: { type: Date, default: Date.now }
// }, { 
//   timestamps: true 
// });

// module.exports = orderSchema;
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String }
  },
  items: [
    {
      productId: { 
        // DİQQƏT: ObjectId-ni String-ə çevirdik ki, Gift Card ID-si xəta verməsin
        type: String, 
        required: true 
      },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Unpaid', 'Paid'], 
    default: 'Unpaid' 
  },
  orderDate: { type: Date, default: Date.now }
}, { 
  timestamps: true 
});

module.exports = orderSchema;