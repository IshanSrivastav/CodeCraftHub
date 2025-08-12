/**
 * User Controller Tests
 * ---------------------
 * This test suite verifies the functionality of user registration and login endpoints.
 * Uses:
 *  - Jest: For running the test suite
 *  - Supertest: For simulating HTTP requests to the Express app
 * 
 * Endpoints tested:
 *  1. POST /api/users/register → Registers a new user
 *  2. POST /api/users/login    → Authenticates a user and returns a JWT
 */

const request = require('supertest'); // Import Supertest for HTTP request simulation
const app = require('../server'); // Import the Express app (adjust path if needed)

describe('User Controller', () => {

    /**
     * Test: Register a new user
     * -------------------------
     * Sends a POST request with username, email, and password.
     * Expects:
     *  - HTTP 201 Created
     *  - JSON message: "User registered successfully"
     */
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(201); // Check HTTP status
        expect(response.body.message).toBe('User registered successfully'); // Check success message
    });

    /**
     * Test: Login an existing user
     * ----------------------------
     * Sends a POST request with email and password.
     * Expects:
     *  - HTTP 200 OK
     *  - Response body containing a JWT token
     */
    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200); // Check HTTP status
        expect(response.body.token).toBeDefined(); // Ensure JWT token exists
    });
});
