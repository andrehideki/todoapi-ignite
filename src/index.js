const express = require('express');
const { v4: uuidV4 } = require('uuid');
const { users } = require('./users');

const app = express();
const port = 3333;

app.use(express.json());

app.post('/users', (req, res) => {
    console.log(req.body)
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

app.listen(port, () => console.log(`Application running at: ${port}`));