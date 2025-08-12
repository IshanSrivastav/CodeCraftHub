/**
 * User Authentication Controller
 * ------------------------------
 * Handles user registration and login functionality.
 * Uses:
 *  - bcrypt: For hashing and comparing passwords securely.
 *  - jsonwebtoken (JWT): For creating authentication tokens.
 *  - Mongoose User model: For storing and retrieving user data from MongoDB.
 */

const User = require('../models/userModel'); // Import the User Mongoose model
const bcrypt = require('bcrypt'); // Library for hashing and verifying passwords
const jwt = require('jsonwebtoken'); // Library for generating and verifying JWT tokens

/**
 * REGISTER a new user
 * -------------------
 * 1. Accepts `username`, `email`, and `password` from request body.
 * 2. Hashes the password before saving it (for security).
 * 3. Creates and saves the new user in the database.
 */
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password with 10 salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store only the hashed password
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: '✅ User registered successfully' });
    } catch (error) {
        // If saving fails, send an error response
        res.status(400).json({ error: error.message });
    }
};

/**
 * LOGIN an existing user
 * ----------------------
 * 1. Accepts `email` and `password` from request body.
 * 2. Checks if the user exists in the database.
 * 3. Compares the provided password with the hashed one.
 * 4. If valid, generates a JWT token for authentication.
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: '❌ User not found' });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: '❌ Invalid credentials' });
        }

        // Generate JWT token (expires in 1 hour)
        const token = jwt.sign(
            { id: user._id }, // Payload data
            process.env.JWT_SECRET, // Secret key from environment variables
            { expiresIn: '1h' } // Token expiry
        );

        // Send token to client
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
