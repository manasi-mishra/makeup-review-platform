// server/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});

// Indexes to support faster queries
reviewSchema.index({ product_id: 1 }); // For retrieving reviews by product
reviewSchema.index({ rating: 1 });     // For filtering or sorting by rating

module.exports = mongoose.model('Review', reviewSchema);
