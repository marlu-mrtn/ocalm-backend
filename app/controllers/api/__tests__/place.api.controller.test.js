import { jest } from '@jest/globals';
import PlaceApiController from '../place.api.controller.js';

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

describe('PlaceApiController methods', () => {

    describe('findAll', () => {
        beforeEach(async () => {
            await PlaceApiController.findAll(mockReq, mockRes, mockNext);
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
            mockReq = { params: { id: 5 } };
            await PlaceApiController.findById(mockReq, mockRes, mockNext);
        });

        test('res.json called', () => {
            expect(mockRes.json).toHaveBeenCalled();
        });

        test('findById method should call res.json with an object with arguments', () => {
            expect(mockRes.json).toHaveBeenCalledWith({ data: expect.any(Object) });
        });
    });

    let createdPlaceId;

    describe('create', () => {
        beforeEach(async () => {
            mockReq = { body: { name: `gruic${Date.now()}`, journey: ["park"], description: "quel super parc", user_id : 5 } };
            try {
                await PlaceApiController.create(mockReq, mockRes, mockNext);
                if (mockRes.json.mock.calls.length > 0) {
                    createdPlaceId = mockRes.json.mock.calls[0][0].data.id;
                }
            } catch (err) {
                console.error('Create err:', err.message);
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
            if (createdPlaceId) {
                mockReq = { params: { id: createdPlaceId } };
                await PlaceApiController.delete(mockReq, mockRes, mockNext);
            }
        });

        test('res.status called', () => {
            if (createdPlaceId) {
                expect(mockRes.status).toHaveBeenCalledWith(204);
            }
        });

        test('res.send called', () => {
            if (createdPlaceId) {
                expect(mockRes.send).toHaveBeenCalled();
            }
        });

        test('delete method should call res.send with no arguments', () => {
            if (createdPlaceId) {
                expect(mockRes.send).toHaveBeenCalledWith();
            }
        });
    });

});
