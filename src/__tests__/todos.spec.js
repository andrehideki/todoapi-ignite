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

    it('Should be able to create a new todo', async () => {
        const response = await request(app)
            .post('/todos')
            .set('username', 'admin')
            .send({
                "title": "todo",
                "deadline": "2022-05-14"
            })
            .expect(201);
            expect(validate(response.body.id)).toBeTruthy();
    });

    it('Should be able to update a todo', async () => {
        const response = await request(app)
            .put('/todos/task')
            .set('username', 'admin')
            .send({
                "title": "updated",
                "deadline": "2022-05-15"
            })
            .expect(200);
    });
});