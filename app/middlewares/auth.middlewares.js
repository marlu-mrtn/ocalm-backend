const jwt = require('jsonwebtoken');

export default {
    
    generateToken: (user) => {
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    },

    verifyToken: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    },
};