import jwt from 'jsonwebtoken';
import ApiError from '../errors/api.error.js';

export default {

    async setCache(cache) {
        this.cache = cache;
    },
    
    async generateToken(data, generateRefresh = false){
        // la durée est en secondes
        const mainTokenTTL = 60 * 15;
        const mainTokenExp = Math.round(Date.now() / 1000 + mainTokenTTL);
        const refreshTokenTTL = 60 * 60 * 24 * 7;
        const refreshTokenExp = Math.round((Date.now() / 1000) + refreshTokenTTL);

        const mainToken = jwt.sign(
            { 
                exp: mainTokenExp,
                data
            }, process.env.JWT_SECRET
        );
        
        if(generateRefresh){
            const refreshToken = jwt.sign(
                {
                    exp: refreshTokenExp, 
                    data: {
                        id: user.id,
                        username: user.username
                    }
                }, process.env.JWT_SECRET
            );

            await this.cache.set(
                `refresh:${data.id}`,
                refreshToken,
                {
                    ttl: refreshTokenTTL
                }
              );

            return {
                mainToken: {
                    token: mainToken,
                    exp: mainTokenExp
                },

                refreshToken: {
                    token: refreshToken,
                    exp: refreshTokenExp
                },
            };
        } else {
            return {
                mainToken: {
                    token: mainToken,
                    exp: mainTokenExp
                }
            };
        };
    },

    async verifyRefreshToken(refreshToken){
        try {
            const data = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const cacheRefreshToken = await this.cache.get(`refresh:${data.id}`);
            if (!cacheRefreshToken || cacheRefreshToken !== refreshToken) {
                throw new ApiError('Refresh token absent ou non correspondant');
            }
            return data;
        } catch(err) {
            throw new ApiError('Authentication échouée', {
                extensions: {
                    code: 'AUTHENTICATION_FAILED',
                    http: {
                        status: 400
                    }
                }
            });
        };
      },

      verifyToken(res, req, next) {
        const bearerHeader = req.headers['authorization'];

        if (!bearerHeader) {
            return next(new ApiError('Token absent', { status: 401 }));
        }
    
        const [, token] = bearerHeader.split(' ');
    
        if (!token) {
            return next(new ApiError('Token absent', { status: 401 }));
        }
    
        try {
            const tokenInfos = verifyToken(token);
            req.user = tokenInfos.userFound; // Stockez les informations de l'utilisateur dans la requête si nécessaire
            next(); // Passez au middleware suivant ou à la route si le token est valide
        } catch (err) {
            next(err); // Passe une ApiError en cas d'erreur de vérification du token
        }
    }
    
};