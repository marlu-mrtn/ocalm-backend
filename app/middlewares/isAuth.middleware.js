import jwt from 'jsonwebtoken';
import ApiError from '../errors/api.error.js';

const isAuth = (req, _, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return next(new ApiError('Token absent', { status: 401 }));
    }

    const [, token] = bearerHeader.split(' ');

    if (!token) {
        return next(new ApiError('Token absent', { status: 401 }));
    }

    try {
        const tokenInfos = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenInfos.user;
        next();

    } catch (err) {
        return next(new ApiError('Token invalide', { status: 401 }));
    }
};

export default isAuth;