import jwt from 'jsonwebtoken';

export default {
    
    generateToken: (user) => {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    },

     verifyToken: (bearer) => {
        if (!bearer) {
            throw new ApiError(401, 'Token absent');
        }

        const [, token] = bearer.split(' ');

        if (!token) {
            throw new ApiError(401, 'Token invalide');
        }
    
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new ApiError(401, 'Token invalide');
        }
    },
};