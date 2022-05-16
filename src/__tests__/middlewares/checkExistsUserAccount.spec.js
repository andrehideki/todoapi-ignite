const { v4: uuidV4 } = require('uuid');
const { checkExistsUserAccount } = require('../../');
const { users } = require('../../users');

const request = (params) => {
    return {...params}
};
const response = {};

describe('checkExistsUserAccount', () => {

    beforeEach(() => {
        users.splice(0, users.length);
        mockNext = jest.fn();
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
        const mockedRequest = request({ headers: { username: user.name }});
        checkExistsUserAccount(mockedRequest, response, mockNext);
        expect(mockNext).toBeCalled();
        expect(mockedRequest.user.id).toBe(user.id);
    });
});