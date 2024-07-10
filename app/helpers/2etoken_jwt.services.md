import jwt from 'jsonwebtoken';

export default {
    
    // Commentaires chatgpt pour comprendre le code
    // Fonction pour générer un token principal et, optionnellement, un token de rafraîchissement
    async generateToken(data, generateRefresh = false) {
        // Définition de l'expiration du token principal (20 secondes)
        const mainTokenExp = Math.round(Date.now() / 1000 + 20);
        // Durée de vie du token de rafraîchissement (1 heure en secondes)
        const refreshTokenTTL = 60 * 60;
        // Définition de l'expiration du token de rafraîchissement (1 heure)
        const refreshTokenExp = Math.round((Date.now() / 1000) + refreshTokenTTL);

        // Génération du token principal avec une date d'expiration et les données utilisateur
        const mainToken = jwt.sign(
            { exp: mainTokenExp, data },
            process.env.JWT_SECRET
        );

        if (generateRefresh) {
            // Génération du token de rafraîchissement avec une date d'expiration et l'ID utilisateur
            const refreshToken = jwt.sign(
                { exp: refreshTokenExp, data: { id: data.id } },
                process.env.JWT_SECRET
            );

            // Mise en cache du token de rafraîchissement avec une durée de vie d'une heure
            await this.cache.set(
                `refresh:${data.id}`,
                data,
                { ttl: refreshTokenTTL }
            );

            // Retour des deux tokens
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
        }

        // Retour du seul token principal
        return {
            mainToken: {
                token: mainToken,
                exp: mainTokenExp
            },
        };
    },

    // Fonction pour vérifier et récupérer les données à partir d'un token de rafraîchissement
    async getFromRefresh(refreshToken) {
        try {
            // Vérification du token de rafraîchissement
            const data = jwt.verify(refreshToken, process.env.JWT_SECRET);
            // Récupération des données depuis le cache en utilisant l'ID utilisateur
            const cachedData = await this.cache.get(`refresh:${data.data.id}`);
            
            if (!cachedData) {
                throw new Error('Refresh token not found');
            }

            return cachedData;
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    },

    // Fonction pour vérifier l'authenticité et l'intégrité d'un token principal et vérifier l'empreinte digitale de la requête
    verifyToken(bearer, fingerprint) {
        if (!bearer) {
            // Pas de token fourni, peut-être accès à une page qui n'en nécessite pas
            return null;
        }

        // Extraction du token à partir du header Authorization
        const [, token] = bearer.split(' ');

        if (!token) {
            return null;
        }

        try {
            // Vérification de la validité du token principal
            const tokenInfos = jwt.verify(token, process.env.JWT_SECRET);
            
            // Vérification de l'empreinte digitale de la requête
            if (fingerprint.ip !== tokenInfos.data.fingerprint.ip || fingerprint.userAgent !== tokenInfos.data.fingerprint.userAgent) {
                throw new Error('Invalid fingerprint');
            }

            return tokenInfos;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}