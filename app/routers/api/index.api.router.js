import express from 'express';
import placeRouter from './place.api.router.js';
import authenticationRouter from './authentication.api.router.js'

const router = express.Router();

router.use((_, res, next) => {
    res.returnFormat = 'json'
    next();
});

router.use('/authentification', authenticationRouter);
router.use('/place', placeRouter);

export default router;
