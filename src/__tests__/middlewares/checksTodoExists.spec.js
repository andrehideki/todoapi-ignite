const { v4: uuidV4 } = require('uuid');
const { createTodo } = require('../builders/todo_builder');
const { checksTodoExists } = require('../../');
const { users } = require('../../users');
const { validate } = require('uuid');

const createRequest = (params) => {
    return {...params};
};

const createResponse = () => {
    const request = {};
    request.status = jest.fn(code => {
        return { ...request, statusCode: code };
    });
    request.send = jest.fn(body => {
        return { ...request, body };
    });
    return request;
};

describe('checksTodoExists', () => {

    var user = {};
    var mockNext;
    var mockResponse;

    beforeEach(() => {
        users.splice(0, users.length);
        mockNext = jest.fn();
        user = {
            id: uuidV4(),
            name: 'test',
            pro: false,
            username: 'test',
            todos: []
        }
        users.push(user);
        mockResponse = createResponse();
    });

    it('Should be able to put user and todo in request when both exits', async () => {
        const todo = createTodo();
        user.todos.push(todo);
        const mockRequest = createRequest({ headers: { username: user.username}, params: {id: todo.id } })
        checksTodoExists(mockRequest, mockResponse, mockNext);
        expect(validate(mockRequest.user.id)).toBeTruthy();
        expect(mockRequest.user.id).toBe(user.id);
        expect(validate(mockRequest.todo.id)).toBeTruthy();
        expect(mockRequest.todo.id).toBe(todo.id);
    });
});