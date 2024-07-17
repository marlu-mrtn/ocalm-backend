import jwt from 'jsonwebtoken';
import ApiError from './api.error.js';

export default {
    generateToken: (user) => {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    },

    verifyToken: (authHeader) => {
        if (!authHeader) {
            throw new ApiError(401, 'Token absent');
        }

        const bearer = authHeader.split(' ');

        if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
            throw new ApiError(401, 'Token invalide');
        }

        const token = bearer[1];

        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new ApiError(401, 'Token invalide');
        }
    },
};
