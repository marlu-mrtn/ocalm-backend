import jwt from 'jsonwebtoken';
import ApiError from '../errors/api.error.js';


export default {
    generateToken: async (user, generateRefresh, cache) => {
        if (!user || !user.id || !user.email) {
            throw new ApiError(400, 'User invalide');
        };

        // la durée est en secondes soit 15mn mainToken et 7jours pour le refresh
        const mainTokenTTL = 60 * 15;
        const mainTokenExp = Math.round(Date.now() / 1000 + mainTokenTTL);
        const refreshTokenTTL = 60 * 60 * 24 * 7;
        const refreshTokenExp = Math.round((Date.now() / 1000) + refreshTokenTTL);

        const mainToken = jwt.sign( 
            { 
                exp: mainTokenExp,
                id: user.id, 
                email: user.email 
            }, 
            process.env.JWT_SECRET,
        );

        if(generateRefresh){
            const refreshToken = jwt.sign(
                { 
                    exp: refreshTokenExp,
                    id: user.id, 
                    email: user.email 
                }, 
                process.env.JWT_SECRET,
            );

            if (cache) {
                await cache.set(
                `refresh:${user.id}`,
                refreshToken,
                    { ttl: refreshTokenTTL },
                );
            };

            return {
                mainToken: {
                    token: mainToken,
                    exp: mainTokenExp,
                },

                refreshToken: {
                    token: refreshToken,
                    exp:refreshTokenExp,
                },
            };
        } else {
            return {
                mainToken: {
                    token: mainToken,
                    exp: mainTokenExp,
                },
            };
        };
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

    verifyRefreshToken: async (refreshToken, cache) => {
        try {
            const user = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const cacheRefreshToken = await cache.get(
                `refresh:${user.id}`
                );
            if (!cacheRefreshToken || cacheRefreshToken !== refreshToken) {
                throw new ApiError('Refresh token absent ou non correspondant');
            }
            return user;
        } catch {
            throw new ApiError(400, 'Authentification échouée');
        };
    },
};
