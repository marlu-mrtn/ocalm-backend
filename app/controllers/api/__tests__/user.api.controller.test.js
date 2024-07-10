import { jest } from '@jest/globals';

import controller from '../user.api.controller.js';
import datamapper from '../../../datamappers/user.datamapper.js';

jest.mock('../../../datamappers/user.datamapper.js');


describe('Controller methods', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
    });

    describe('findAll', () => {
        it('should return JSON data', async () => {
            const mockData = [{ id: 1, name: 'Test' }];
            datamapper.findAll.mockResolvedValue(mockData);

            const res = {
                json: jest.fn(),
            };

            await controller.findAll(null, res);

            expect(res.json).toHaveBeenCalledWith({ data: mockData });
        });
    });

    describe('findById', () => {
        it('should return JSON data if entity is found', async () => {
            const mockData = { id: 1, name: 'Test' };
            datamapper.findById.mockResolvedValue(mockData);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await controller.findById(req, res);

            expect(res.json).toHaveBeenCalledWith({ data: mockData });
        });

        it('should return 404 if entity is not found', async () => {
            datamapper.findById.mockResolvedValue(null);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await controller.findById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: `${controller.entityName} introuvable` });
        });
    });

    describe('create', () => {
        it('should return 201 with JSON data', async () => {
            const mockData = { id: 1, name: 'Test' };
            datamapper.create.mockResolvedValue(mockData);

            const req = { body: { name: 'Test' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await controller.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ data: mockData });
        });
    });

    describe('update', () => {
        it('should return JSON data if entity is found', async () => {
            const mockData = { id: 1, name: 'Updated Test' };
            datamapper.update.mockResolvedValue(mockData);

            const req = { params: { id: 1 }, body: { name: 'Updated Test' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await controller.update(req, res);

            expect(res.json).toHaveBeenCalledWith({ data: mockData });
        });

        it('should return 404 if entity is not found', async () => {
            datamapper.update.mockResolvedValue(null);

            const req = { params: { id: 1 }, body: { name: 'Updated Test' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await controller.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: `${controller.entityName} introuvable` });
        });
    });

    describe('delete', () => {
        it('should return 204 if entity is deleted', async () => {
            datamapper.delete.mockResolvedValue(true);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await controller.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalled();
        });

        it('should return 404 if entity is not found', async () => {
            datamapper.delete.mockResolvedValue(false);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await controller.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: `${YourClass.entityName} introuvable` });
        });
    });
});








// const mockReq = {};
// const mockRes = {};
// mockRes.json = jest.fn(() => mockRes);
// const mockNext = jest.fn();

// describe('res.json', () => {
    
//     beforeAll(async () => {
//         await controller.findAll(mockReq, mockRes, mockNext);
//     });

//     test('res.json called', () => {
//         expect(mockRes.json).toHaveBeenCalled();
//     });

//     test('findAll method should call res.json with an object with arguments', () => {
//         expect(mockRes.json).toHaveBeenCalledWith({ data: expect.any(Object) });
//     });

//     test('Is res.json called with findById', () => {
//         expect(typeof findById).toBe('object');
//       });

// });