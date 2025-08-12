
/**
 * MongoDB Connection Script using Mongoose
 * -----------------------------------------
 * This script establishes a connection to a MongoDB database
 * using the Mongoose ODM (Object Data Modeling) library.
 * The database URI is loaded from the `.env` file for security.
 */

const mongoose = require('mongoose'); // Import Mongoose library for MongoDB connection
require('dotenv').config(); // Load environment variables from .env file

// Retrieve MongoDB connection string from environment variables
const DB_URI = process.env.DB_URI;

/**
 * Connects to the MongoDB database.
 * 
 * This function uses async/await for asynchronous operation.
 * It attempts to connect to the database using the URI specified
 * in the environment variable. If the connection fails, it logs
 * the error and terminates the application.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(DB_URI, { 
            useNewUrlParser: true, // Use the new URL parser (improves parsing of connection string)
            useUnifiedTopology: true // Use the new Server Discovery and Monitoring engine
        });

        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        // Log connection errors
        console.error('❌ MongoDB connection error:', error);
        
        // Exit the application with a failure code (1)
        process.exit(1);
    }
};

// Export the function so it can be used in other files
module.exports = connectDB;
