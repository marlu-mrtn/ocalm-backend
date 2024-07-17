import jwt from 'jsonwebtoken';


export default {
    generateToken: (user) => {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    },

    verifyToken: (authHeader) => {
	console.log("coucou", authHeader.headers.authorization);
	const token = authHeader.headers.authorization;
	console.log("ICI LE TOKEN ICIIIIIIIIIIIII", token);
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
            return jwt.verify(token1, process.env.JWT_SECRET);
        } catch (error) {
            throw new ApiError(401, 'Token invalide');
        }
    },
};
