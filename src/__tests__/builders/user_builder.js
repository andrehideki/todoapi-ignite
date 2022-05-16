const { v4: uuidV4 } = require('uuid');

function createUser() {
    return {
        id: uuidV4(),
        name: 'user',
        username: 'user',
        todos: [
            {
                id: uuidV4(),
                title: 'task',
                done: false,
                deadline: new Date(),
                created_at: new Date()
            }
        ]
    }
}

module.exports = {
    createUser
}