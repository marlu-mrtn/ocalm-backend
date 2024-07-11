import express from 'express';
import apiRouter from './api/index.api.router.js';
import ApiError from '../errors/api.error.js';
import errorMiddleware from '../middlewares/error.middelware.js';

//Ce fichier est le routeur PRINCIPAL NUMBER ONE, il permet de diriger vers de potentiels autres routeurs que celui de notre api initiale.

const router = express.Router();

router.use('/', apiRouter);

router.use(() => {
    throw new ApiError('Not Found', {status: 404});
  });
  router.use(errorMiddleware);

export default router;
