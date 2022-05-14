const { v4: uuidV4 } = require('uuid');

module.exports = {
    users: [
        {
            id: uuidV4(),
            name: 'admin',
            username: 'admin',
            todos: []
        }
    ]
}