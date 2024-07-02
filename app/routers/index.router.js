import express from 'express';
import apiRouter from './api/index.api.router.js';

const router = express.Router();

router.use('/', apiRouter);

export default router;
