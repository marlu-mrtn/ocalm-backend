import express from 'express';
import registerRouter from './register.api.router.js';
import userRouter from './user.api.router.js';
import placeRouter from './place.api.router.js';
import loginRouter from './login.api.router.js'

const router = express.Router();

router.use((_, res, next) => {
    res.returnFormat = 'json';
    next();
});

router.use('/user', userRouter);
router.use('/register', registerRouter);
router.use('/places', placeRouter);
router.use('/login', loginRouter);

export default router;
