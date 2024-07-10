import { jest } from '@jest/globals';

import controller from '../user.api.controller.js';

const mockReq = {};
const mockRes = {};
mockRes.json = jest.fn(() => mockRes);
const mockNext = jest.fn();

describe('Controller methods', () => {
    

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
        const mockReq = { body: { username: "harry", email: "harry@gmail.com", password: "#1gKiJItKHLNp2"} };

        beforeAll(async () => {
            await controller.create(mockReq, mockRes, mockNext);
        });
    
        test('res.json called', () => {
            expect(mockRes.json).toHaveBeenCalled();
        });
    
        test('create method should call res.json with an object with arguments', () => {
            expect(mockRes.json).toHaveBeenCalledWith({ data: expect.any(Object) });
        });
    });

});