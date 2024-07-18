import express from 'express';
import apiRouter from './api/index.api.router.js';
import ApiError from '../errors/api.error.js';
import errorMiddleware from '../middlewares/error.middelware.js';

const router = express.Router();

router.use('/', apiRouter);

router.use(() => {
    throw new ApiError('Introuvable', {status: 404});
});

router.use(errorMiddleware);

export default router;
