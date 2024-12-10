// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const reportRoutes = require('./routes/reports');

// Set up routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
