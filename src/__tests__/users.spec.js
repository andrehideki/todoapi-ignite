const request = require('supertest');
const { validate } = require('uuid');
const app = require('../index');

describe('users', () => {
    it('Should be able to create a user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                title: 'todo',
                deadline: '2022-05-14'
            })
            .expect(201);
        expect(validate(response.body.id)).toBeTruthy();
    });
});