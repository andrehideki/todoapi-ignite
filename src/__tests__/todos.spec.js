const request = require('supertest');
const { validate } = require('uuid');
const app = require('../index');

describe('todos', () => {
    it('Should be able to list all user\'s todos', async () => {
        const response = await request(app)
            .get('/todos')
            .set('username', 'admin')
            .expect(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});