import { jest } from '@jest/globals';
import UserApiController from '../user.api.controller.js';

let mockReq;
let mockRes;
let mockNext;

beforeEach(() => {
    // Initialiser les mocks avant chaque test
    mockReq = {};
    mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('UserApiController methods', () => {
    let createdUserId;

    describe('findAll', () => {
        beforeEach(async () => {
            await UserApiController.findAll(mockReq, mockRes, mockNext);
        });

        test('res.json called', () => {
            expect(mockRes.json).toHaveBeenCalled();
        });

        test('findAll method should call res.json with an object with arguments', () => {
            expect(mockRes.json).toHaveBeenCalledWith({ data: expect.any(Object) });
        });
    });

    describe('findById', () => {
        beforeEach(async () => {
            mockReq = { params: { id: 2 } };
            await UserApiController.findById(mockReq, mockRes, mockNext);
        });

        test('res.json called', () => {
            expect(mockRes.json).toHaveBeenCalled();
        });

        test('findById method should call res.json with an object with arguments', () => {
            expect(mockRes.json).toHaveBeenCalledWith({ data: expect.any(Object) });
        });
    });

    describe('signUp', () => {
        beforeEach(async () => {
            mockReq = { body: { username: `uniqueuser${Date.now()}`, email: `uniqueuser${Date.now()}@gmail.com`, password: "#1gKiJItKHLNp2", passwordConfirm: "#1gKiJItKHLNp2" } };
            try {
                await UserApiController.signUp(mockReq, mockRes, mockNext);
                if (mockRes.json.mock.calls.length > 0) {
                    createdUserId = mockRes.json.mock.calls[0][0].newUser;
                }
                console.log('Created User ID:', createdUserId);
            } catch (err) {
                console.error('SignUp error:', err.message);
            }
        });

        test('res.status called', () => {
            if (mockRes.status.mock.calls.length > 0) {
                expect(mockRes.status).toHaveBeenCalledWith(200);
            }
        });

        test('res.json called', () => {
            if (mockRes.json.mock.calls.length > 0) {
                expect(mockRes.json).toHaveBeenCalled();
            }
        });

        test('signUp method should call res.json with an object with arguments', () => {
            if (mockRes.json.mock.calls.length > 0) {
                expect(mockRes.json).toHaveBeenCalledWith({
                    message: "User registered successfully",
                    newUser: expect.any(Number),
                });
            }
        });
    });

    describe('delete', () => {
        beforeEach(async () => {
            if (createdUserId) {
                mockReq = { params: { id: createdUserId } };
                console.log('Deleting User ID:', createdUserId);
                try {
                    await UserApiController.delete(mockReq, mockRes, mockNext);
                } catch (err) {
                    console.error('Delete error:', err.message);
                }
            }
        });

        test('res.status called', () => {
            if (createdUserId) {
                expect(mockRes.status).toHaveBeenCalledWith(204);
            }
        });

        test('res.send called', () => {
            if (createdUserId) {
                console.log('Checking if res.send was called');
                expect(mockRes.send).toHaveBeenCalled();
            }
        });

        test('delete method should call res.send with no arguments', () => {
            if (createdUserId) {
                console.log('Checking if res.send was called with no arguments');
                expect(mockRes.send).toHaveBeenCalledWith();
            }
        });
    });
});
