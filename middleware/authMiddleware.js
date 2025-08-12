// authMiddleware.js

const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token verification

// Middleware function to authenticate requests
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken; // Export the authentication middleware