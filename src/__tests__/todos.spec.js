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
        await request(app)
            .put('/todos/task')
            .set('username', 'admin')
            .send({
                "title": "updated",
                "deadline": "2022-05-15"
            })
            .expect(200);
    });

    it('Should not be able to update a non existing todo', async () => {
        const response = await request(app)
            .put('/todos/nonexisting')
            .set('username', 'admin')
            .send({
                "title": "updated",
                "deadline": "2022-05-15"
            })
            .expect(404);
        expect(response.body.error).toBe('Todo not found');
    });

    it('Should be able to mark a todo as done', async () => {
        await request(app)
            .patch('/todos/task/done')
            .set('username', 'admin')
            .expect(200);
    });

    it('Should not be able to mark a non existing todo as done', async () => {
        const response = await request(app)
            .patch('/todos/nonexisting/done')
            .set('username', 'admin')
            .expect(404);
        expect(response.body.error).toBe('Todo not found');
    });

    it('Should be able to delete a todo', async () => {
        await request(app)
            .delete('/todos/task')
            .set('username', 'admin')
            .expect(204);
    });

    it('Should not be able to delete a non existing todo', async () => {
        await request(app)
            .delete('/todos/nonexisting')
            .set('username', 'admin')
            .expect(404);
    });

});