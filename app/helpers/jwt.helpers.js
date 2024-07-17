import jwt from 'jsonwebtoken';


export default {
    generateToken: (user) => {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    },

    verifyToken: (req,res,next) => {
	console.log("coucou", req.headers.authorization);
	const token = req.headers.authorization;
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
            const response= jwt.verify(token1, process.env.JWT_SECRET);
		console.log("response de mon jwt.verify",response.userFound);
		req.userId=response.userFound;
		next();
        } catch (error) {
            throw new ApiError(401, 'Token invalide');
        }
    },
};
