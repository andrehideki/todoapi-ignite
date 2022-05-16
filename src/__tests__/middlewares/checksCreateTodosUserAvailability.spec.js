const { v4: uuidV4 } = require('uuid');
const { createTodo } = require('../builders/todo_builder');
const { checksCreateTodosUserAvailability } = require('../../');
const { users } = require('../../users');

const MAX_NUMBER_OF_TODOS = 10;

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

var mockNext = jest.fn();
var mockResponse = createResponse();


describe('checksCreateTodosUserAvailability', () => {
    
    var user = {};
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
    });

    it('Should be able to let user create a new todo when is in free plan and have less than ten todos', async() => {
        const mockRequest = createRequest({ user });
        checksCreateTodosUserAvailability(mockRequest, mockResponse, mockNext);
        expect(mockNext).toBeCalled(); 
    });
    
    it('Should not be able to let user create a new todo when is not Pro and already have ten todos', async() => {
        for (let i=0; i<MAX_NUMBER_OF_TODOS; i++) {
            user.todos.push(createTodo());
        }
        const mockRequest = createRequest({ user });
        checksCreateTodosUserAvailability(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toBeCalledWith(403); 
    });

    it('Should be able to let user create infinite new todos when is in Pro plan', async() => {
        user.pro = true;
        for (let i=0; i<MAX_NUMBER_OF_TODOS * MAX_NUMBER_OF_TODOS; i++) {
            user.todos.push(createTodo());
        }
        const mockRequest = createRequest({ user });
        checksCreateTodosUserAvailability(mockRequest, mockResponse, mockNext);
        expect(mockNext).toBeCalled(); 
    });
});