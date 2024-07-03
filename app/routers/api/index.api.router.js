import express from 'express';
import registerRouter from './register.api.router.js';
// import loginRouter from './login.api.router.js'
// import placeRouter from './place.api.router.js';

const router = express.Router();

router.use((_, res, next) => {
    res.returnFormat = 'json'
    next();
});

router.use('/register', registerRouter);
// router.use('/login', loginRouter);
// router.use('/place', placeRouter);

export default router;
