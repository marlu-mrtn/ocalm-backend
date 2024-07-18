/* eslint-disable no-unused-vars */
import logger from '../utils/logger.utils.js';
/**
 * @typedef {object} ApiError
 * @property {string} message - Message d'erreur
 * @property {string} name - Nom de l'erreur
 * @property {object} infos - Informations additionnelles
 */
export default (err, req, res, next) => {
    let { status, message } = err;

    if(err.name === 'erreurValidation'){
        status = 400;
        message = err.details.map((detail) => detail.message);
    }

    if(err.name === 'erreur' && err.code === '23505'){
        status = 400;
        message = err.detail;
    }

    if (!status) {
        status = 500;
    }

    if (status === 500) {
        logger.error('', err);
        message = 'Erreur serveur interne';
    }

    if (res.returnFormat === 'html') {
        return res.status(status).render('erreur', {
            httpStatus: status,
            message,
        });
    }

    return res.status(status).json({ error: message });
};
