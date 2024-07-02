import express from 'express';
import placeRouter from './place.api.router.js';
import authentificationRouter from './authentification.api.router.js';

const router = express.Router();

router.use((_, res, next) => {
    res.returnFormat = 'json'
    next();
});

router.use('/authentification', authentificationRouter);
router.use('/place', placeRouter);

export default router;
