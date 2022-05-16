const { v4: uuidV4 } = require('uuid');
const { checkExistsUserAccount } = require('../../');
const { users } = require('../../users');

const mockObject = (params) => {
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

describe('checkExistsUserAccount', () => {

    beforeEach(() => {
        users.splice(0, users.length);
        mockNext = jest.fn();
        response = mockObject({});
    });

    it('Should be able to find user by username in header and pass it to request.user', async () => {
        const user = {
            id: uuidV4(),
            name: 'test',
            username: 'test',
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
        users.push(user);
        const mockRequest = mockObject({ headers: { username: user.name }});
        checkExistsUserAccount(mockRequest, response, mockNext);
        expect(mockNext).toBeCalled();
        expect(mockRequest.user.id).toBe(user.id);
    });

    it('Should not be able to find a non existing user by username in header', async () => {
        const mockRequest = mockObject({ headers: {} });
        const mockResponse = createResponse();
        checkExistsUserAccount(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toBeCalledWith(404);
    });
});