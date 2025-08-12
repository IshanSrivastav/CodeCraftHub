const request = require('supertest');
const app = require('../server'); // Adjust the import based on your server file structure

describe('User Controller', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });
});