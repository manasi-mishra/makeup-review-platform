// routes/products.js
const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();


// adding a product
router.post('/', async (req, res) => {
    const { name, brand, category, description } = req.body;

    try {
        const newProduct = new Product({ name, brand, category, description });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch reviews for a specific product
router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ product_id: req.params.id })
            .populate('product_id', 'name') // populate product name if needed
            .populate('user_id', 'username'); // populate username if needed
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// edit/update product info
router.put('/:id', async (req, res) => {
    const { name, brand, category, description } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, brand, category, description }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// delete product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
