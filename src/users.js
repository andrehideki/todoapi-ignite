const { v4: uuidV4 } = require('uuid');

module.exports = {
    users: [
        {
            id: uuidV4(),
            name: 'admin',
            username: 'admin',
            todos: [
                {
                    id: '7edb7367-ab76-4abf-80bb-5cc1e57f99dc',
                    title: 'task',
                    done: false,
                    deadline: new Date(),
                    created_at: new Date()
                }
            ]
        }
    ]
}