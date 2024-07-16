import jwt from 'jsonwebtoken';

export default {

    setCache: async (cache) => {
        this.cache = cache;
    },
    
    generateToken: async (user, generateRefresh = false) => {
        const mainTokenExp = Math.round(Date.now() / 1000 + 20);
        const refreshTokenTTL = 60 * 60;
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
                user,
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
        };
    },

    verifyToken: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET);
    },

};