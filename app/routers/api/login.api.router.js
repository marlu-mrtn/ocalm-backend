import express from 'express';
import controller from '../../controllers/api/user.api.controller.js';

/**
 * Routeur pour les opérations utilisateur.
 * @module routers/user
 */
const router = express.Router();

/**
 * Route pour l'authentification utilisateur.
 * @name /user/
 * @function
 * @memberof module:routers/user
 * @param {function} controller.login - Contrôleur pour la connexion de l'utilisateur.
 */
router.route('/')
    .post(controller.login.bind(controller));

export default router;
