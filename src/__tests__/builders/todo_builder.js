const { v4: uuidV4 } = require('uuid');

function createTodo() {
    return {
        id: uuidV4(),
        title: 'task',
        done: false,
        deadline: new Date(),
        created_at: new Date()
    }
}

module.exports = {
    createTodo
}