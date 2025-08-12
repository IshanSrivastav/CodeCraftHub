/**
 * Main Server Entry Point
 * -----------------------
 * This file initializes the Express application, connects to MongoDB,
 * and sets up API routes for user authentication.
 * 
 * Technologies Used:
 *  - Express: Web application framework for Node.js
 *  - Mongoose: ODM (Object Data Modeling) library for MongoDB
 *  - dotenv: Loads environment variables from .env file
 *  - userRoutes: Contains authentication routes (register, login)
 */

const express = require('express'); // Express framework for building APIs
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const userRoutes = require('./routes/userRoutes'); // Import user authentication routes
require('dotenv').config(); // Load environment variables from .env

// Create an instance of the Express application
const app = express();

// Set server port (from environment or default to 3000)
const PORT = process.env.PORT || 3000;

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User authentication routes (prefix: /api/users)
app.use('/api/users', userRoutes);

// Start the Express server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});

// Export app for testing purposes (e.g., Supertest)
module.exports = app;
