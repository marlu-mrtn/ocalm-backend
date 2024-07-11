import express from 'express';
import controller from '../../controllers/api/user.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';
import createSchema from '../../schemas/login.post.schema.js';

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
    .post(validationMiddleware(createSchema, 'body'),wrapper(controller.login.bind(controller)));

export default router;
