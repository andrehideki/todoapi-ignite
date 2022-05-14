const request = require('supertest');
const { validate } = require('uuid');
const app = require('../index');

describe('users', () => {
    it('Should be able to create a user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: "fulano",
                username: "fulano"
            })
            .expect(201);
        expect(validate(response.body.id)).toBeTruthy();
    });

    it('Should not be able to create a new user when username already exists', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'admin',
                username: 'admin'
            })
            .expect(400);
        expect(response.body.error).toBe('Username already exists')
    });
});