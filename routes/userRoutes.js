/**
 * User Routes
 * -----------
 * Defines API endpoints for user authentication.
 * 
 * Endpoints:
 *  - POST /register → Register a new user
 *  - POST /login    → Authenticate a user and return a JWT
 */

const express = require('express');
const userController = require('../controllers/userController'); // Import authentication controller functions

const router = express.Router(); // Create a new Express router instance

// Route: Register a new user
// Method: POST
// Path: /register
router.post('/register', userController.register);

// Route: Login an existing user
// Method: POST
// Path: /login
router.post('/login', userController.login);

// Export the router to use in the main app
module.exports = router;
