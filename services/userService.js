// userService.js

const User = require('../models/userModel'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating tokens
require('dotenv').config(); // Load environment variables

// Function to register a new user
const registerUser = async (username, email, password) => {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return newUser; // Return the newly created user
};

// Function to login a user
const loginUser = async (email, password) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, token }; // Return user information and token
};

module.exports = { registerUser, loginUser }; // Export the service functions