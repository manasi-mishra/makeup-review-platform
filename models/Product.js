// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
});

// Index to support filtering by category
productSchema.index({ category: 1 });

module.exports = mongoose.model('Product', productSchema);
