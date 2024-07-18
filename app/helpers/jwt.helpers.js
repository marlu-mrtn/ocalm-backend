import jwt from 'jsonwebtoken';
import ApiError from '../errors/api.error.js';


export default {
    generateToken: (user) => {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
    },

    verifyToken: (req, _, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError(401, 'Token absent');
        }

        const bearer = token.split(' ');

        if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
            throw new ApiError(401, 'Token invalide');
        }

        const token1 = bearer[1];
        console.log(token1);

        try {
            const response = jwt.verify(token1, process.env.JWT_SECRET);
            req.userId = response.userFound;

            next();

        } catch {
            throw new ApiError(401, 'Token invalide');
        }
    },
};
