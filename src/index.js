const express = require('express');
const { v4: uuidV4, validate } = require('uuid');
const { users } = require('./users');

const app = express();

app.use(express.json());

function checkExistsUserAccount(req, res, next) {
    const { username } = req.headers;
    if (!username) return res.status(404).send({ error: 'Username is empty' });
    const user = users.filter(u => u.username === username)[0];
    if (!user) return res.status(400).send({ error: 'User not found' });
    req.user = user;
    return next();
}

function checksCreateTodosUserAvailability(req, res, next) {
    const { user } = req;
    if (user.todos.length >= 10) return res.status(400).send({ error: 'The limit of available todos has passed' });
    return next();
}

function checksTodoExists(req, res, next) {
    const { id } = req.params;
    const isInvalidatedId = !validate(id);
    if (isInvalidatedId) return res.status(400).send({ error: 'Todo id is invalid' });
    const { user } = req;
    const todo = user.todos.find(t => t.id === id);
    if (!todo) return res.status(404).send({ error: 'Todo not found' });
    req.todo = todo;
    return next();
}

app.post('/users', (req, res) => {
    const { name, username } = req.body;
    if (users.find(u => u.username === username)) return res.status(400).send({ error: 'Username already exists' });
    const user = {
        id: uuidV4(),
        name,
        username,
        todos: []
    }
    users.push(user);
    return res.status(201).send(user);
});

app.get('/todos', checkExistsUserAccount, (req, res) => {
    return res.json(req.user.todos);
});

app.post('/todos', checkExistsUserAccount, checksCreateTodosUserAvailability, (req, res) => {
    const { title, deadline } = req.body;
    const { user } = req;
    const todo = {
        id: uuidV4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    };
    user.todos.push(todo);
    return res.status(201).send(todo);
});

app.put('/todos/:id', checkExistsUserAccount, checksTodoExists, (req, res) => {
    const { id } = req.params;
    const { title, deadline } = req.body;
    const { user } = req;
    const todo = user.todos.find(t => t.id === id);
    if (!todo) return res.status(404).send({ error: 'Todo not found' });
    todo.title = title;
    todo.deadline = new Date(deadline);
    return res.status(200).send(todo);
});

app.patch('/todos/:id/done', checkExistsUserAccount, checksTodoExists, (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const todo = user.todos.find(t => t.id === id);
    if (!todo) return res.status(404).send({ error: 'Todo not found' });
    todo.done = true;
    return res.status(200).send(todo);
});

app.delete('/todos/:id', checkExistsUserAccount, checksTodoExists, (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const todo = user.todos.find(t => t.id === id);
    if (!todo) return res.status(404).send({ error: 'Todo not found' });
    user.todos.splice(todo, 1);
    return res.status(204).send();
});

module.exports = app;