const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Route to log in or create a new user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        
        if (user) {
            // User exists, validate the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                // Password does not match
                return res.status(400).json({ message: "Invalid credentials" });
            }
            // Password matches, login is successful
            res.status(200).json({ message: "Login successful", username: user.username });
        } else {
            // User does not exist, create a new user
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({ username, password: hashedPassword });
            await user.save();
            res.status(201).json({ message: "User created and login successful", username: user.username });
        }
    } catch (error) {
        console.error("Error processing login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
