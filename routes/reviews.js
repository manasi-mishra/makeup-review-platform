// server/routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to create a new review
router.post('/', async (req, res) => {
    const { product_id, rating, comment } = req.body;

    if (!product_id || !rating || !comment) {
        return res.status(400).json({ message: "Please provide product_id, rating, and comment." });
    }

    try {
        const newReview = new Review({
            product_id,
            rating,
            comment,
            createdAt: new Date()
        });
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to edit/update a review
router.put('/:id', async (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({ message: "Please provide rating and comment." });
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, comment },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to delete a review
router.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
