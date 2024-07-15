import { jest } from '@jest/globals';
import controller from '../user.api.controller.js';

const mockReq = {};
const mockRes = {};
mockRes.status = jest.fn().mockReturnThis();
mockRes.send = jest.fn().mockReturnThis(); // Modifiez ceci pour retourner `this`
mockRes.json = jest.fn().mockReturnThis(); // Assurez-vous de retourner `this` pour chaîner les méthodes
const mockNext = jest.fn();

describe('Controller methods', () => {
    let createdUserId;

    describe('findAll', () => {
        beforeAll(async () => {
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
        const mockReq = { params: { id: 1 } };

        beforeAll(async () => {
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
        const mockReq = { body: { username: `harrypotter212}`, email: `harrypotter212@gmail.com`, password: "#1gKiJItKHLNp2"} };

        beforeAll(async () => {
            await controller.create(mockReq, mockRes, mockNext);
            createdUserId = mockRes.json.mock.calls[0][0].data[0].id; // Assuming the created user ID is in the response data
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
        const mockReq = { params: { id: createdUserId } };

        beforeAll(async () => {
            await controller.delete(mockReq, mockRes, mockNext);
        });

        test('res.status called', () => {
            expect(mockRes.status).toHaveBeenCalledWith(204);
        });

        test('res.send called', () => {
            expect(mockRes.send).toHaveBeenCalled();
        });

        test('delete method should call res.send with no arguments', () => {
            expect(mockRes.send).toHaveBeenCalledWith(); // Attendez-vous à aucun argument
        });
    });
});
