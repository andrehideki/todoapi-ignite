const { v4: uuidV4 } = require('uuid');
const { createTodo } = require('../builders/todo_builder');
const { findUserById } = require('../../');
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

describe('findUserById', () => {

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

    it('Should be able to find user by id route param and pass it to request.user', async () => {
        const mockRequest = createRequest({ params: {id: user.id } })
        findUserById(mockRequest, mockResponse, mockNext);
        expect(validate(mockRequest.user.id)).toBeTruthy();
        expect(mockRequest.user.id).toBe(user.id);
    });
});