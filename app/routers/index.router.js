import express from 'express';
import apiRouter from './api/index.api.router.js';

//Ce fichier est le routeur PRINCIPAL NUMBER ONE, il permet de diriger vers de potentiels autres routeurs que celui de notre api initiale.

const router = express.Router();

router.use('/', apiRouter);

export default router;
