const express = require('express');
const { v4: uuidV4 } = require('uuid');
const { users } = require('./users');

const app = express();
const port = 3333;

app.use(express.json());

function getUser(req, res, next) {
    const { username } = req.headers;
    if (!username) return res.status(400).send({ error: 'Username is empty' });
    const user = users.filter(u => u.username === username)[0];
    if (!user) return res.status(400).send({ error: 'User not found' });
    req.user = user;
    return next();
}

app.post('/users', (req, res) => {
    const { name, username } = req.body;
    const user = {
        id: uuidV4(),
        name,
        username,
        todos: []
    }
    users.push(user);
    return res.status(201).send(user);
});


app.use(getUser);

app.get('/todos', (req, res) => {
    return res.json(req.user.todos);
});

app.listen(port, () => console.log(`Application running at: ${port}`));