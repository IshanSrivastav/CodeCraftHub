/**
 * User Model
 * ----------
 * Defines the MongoDB schema for storing user data.
 * Uses Mongoose to define fields, their types, and constraints.
 * 
 * Fields:
 *  - username: Unique name for the user (required)
 *  - email: Unique email address of the user (required)
 *  - password: Hashed password string (required)
 * 
 * Options:
 *  - timestamps: Automatically adds `createdAt` and `updatedAt` fields
 */

const mongoose = require('mongoose'); // Import Mongoose for schema definition

// Define the schema structure for a User document
const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, // Must be provided
            unique: true    // Cannot be duplicate
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true // Store hashed password, not plain text
        },
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model to use it in controllers/routes
module.exports = User;
