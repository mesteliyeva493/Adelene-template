const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    { timestamps: true }
);

module.exports = tagsSchema;