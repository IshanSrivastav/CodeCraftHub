// config.js

require('dotenv').config(); // Load environment variables

const config = {
    PORT: process.env.PORT || 3000, // Set the port for the application
    DB_URI: process.env.DB_URI, // MongoDB connection URI
    JWT_SECRET: process.env.JWT_SECRET, // Secret key for JWT signing
};

module.exports = config; // Export the configuration object