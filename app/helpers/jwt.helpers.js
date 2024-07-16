import jwt from 'jsonwebtoken';

export default {
    
    generateToken: (user) => {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    },

    verifyToken: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    },
};