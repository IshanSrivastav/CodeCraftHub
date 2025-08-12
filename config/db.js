const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;