// server/routes/reports.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');

// Route to get the average rating for a specific product
router.get('/average-rating/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        // Aggregation pipeline to calculate the average rating
        const stats = await Review.aggregate([
            { $match: { product_id: new mongoose.Types.ObjectId(productId) } }, // Match reviews for the product
            {
                $group: {
                    _id: "$product_id",
                    averageRating: { $avg: "$rating" },
                    reviewCount: { $sum: 1 }
                }
            }
        ]);

        // Return result if available, or indicate no reviews
        if (stats.length === 0) {
            return res.json({ averageRating: null, reviewCount: 0 });
        }

        res.json({ averageRating: stats[0].averageRating, reviewCount: stats[0].reviewCount });
    } catch (error) {
        console.error('Error fetching average rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
