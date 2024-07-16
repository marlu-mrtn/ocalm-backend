import jwt from 'jsonwebtoken';
import ApiError from '../errors/api.error.js';

export default {

    async setCache(cache) {
        this.cache = cache;
    },
    
    async generateToken(user, generateRefresh = false){
        // la durée est en secondes
        const mainTokenTTL = 60 * 15;
        const mainTokenExp = Math.round(Date.now() / 1000 + mainTokenTTL);
        const refreshTokenTTL = 60 * 60 * 24 * 7;
        const refreshTokenExp = Math.round((Date.now() / 1000) + refreshTokenTTL);

        const mainToken = jwt.sign(
            { 
                exp: mainTokenExp,
                user
            }, process.env.JWT_SECRET
        );
        
        if(generateRefresh){
            const refreshToken = jwt.sign(
                {
                    exp: refreshTokenExp, 
                    user: {
                        id: user.id,
                        username: user.username
                    }
                }, process.env.JWT_SECRET
            );

            await this.cache.set(
                `refresh:${user.id}`,
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
            const user = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const cacheRefreshToken = await this.cache.get(`refresh:${user.id}`);
            if (!cacheRefreshToken || cacheRefreshToken !== refreshToken) {
                throw new ApiError('Refresh token absent ou non correspondant');
            }
            return user;
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

      verifyToken(bearer, fingerprint){
        if(!bearer){
            return null;
        }

        const [, token] = bearer.split(' ');

        if(!token){
            return null;
        }

        try {

            const tokenInfos = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            if(fingerprint.ip !== tokenInfos.data.fingerprint.ip || fingerprint.userAgent !== tokenInfos.data.fingerprint.userAgent){
                throw new Error('');
            }

            return tokenInfos;
        } catch(err) {
            throw new ApiError('Authentication échouée', {
                extensions: {
                    code: 'AUTHENTICATION_FAILED',
                    http: {
                        status: 400
                    }
                }
            });
        }
    }

};