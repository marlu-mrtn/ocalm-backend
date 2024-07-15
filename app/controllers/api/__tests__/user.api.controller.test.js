import { jest } from '@jest/globals';
import controller from '../user.api.controller.js';

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

describe('Controller methods', () => {
    let createdUserId;

    describe('findAll', () => {
        beforeEach(async () => {
            await controller.findAll(mockReq, mockRes, mockNext);
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
            mockReq = { params: { id: 1 } };
            await controller.findById(mockReq, mockRes, mockNext);
        });

        test('res.json called', () => {
            expect(mockRes.json).toHaveBeenCalled();
        });

        test('findById method should call res.json with an object with arguments', () => {
            expect(mockRes.json).toHaveBeenCalledWith({ data: expect.any(Object) });
        });
    });

    describe('create', () => { 
        beforeEach(async () => {
            // Assurez-vous que l'utilisateur n'existe pas avant de le créer
            mockReq = { body: { username: `uniqueuser`, email: `uniqueuser@gmail.com`, password: "#1gKiJItKHLNp2" } };
            await controller.create(mockReq, mockRes, mockNext);
            if (mockRes.json.mock.calls.length > 0) {
                createdUserId = mockRes.json.mock.calls[0][0].data.id;
            }
        });

        test('res.status called', () => {
            expect(mockRes.status).toHaveBeenCalledWith(201);
        });

        test('res.json called', () => {
            expect(mockRes.json).toHaveBeenCalled();
        });

        test('create method should call res.json with an object with arguments', () => {
            expect(mockRes.json).toHaveBeenCalledWith({ data: expect.any(Object) });
        });
    });

    describe('delete', () => {
        beforeEach(async () => {
            mockReq = { params: { id: createdUserId } };
            await controller.delete(mockReq, mockRes, mockNext);
        });

        test('res.status called', () => {
            expect(mockRes.status).toHaveBeenCalledWith(204);
        });

        test('res.send called', () => {
            expect(mockRes.send).toHaveBeenCalled();
        });

        test('delete method should call res.send with no arguments', () => {
            expect(mockRes.send).toHaveBeenCalledWith();
        });
    });
});
