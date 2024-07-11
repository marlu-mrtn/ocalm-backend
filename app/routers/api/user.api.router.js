import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';
import getSchema from '../../schemas/user.get.schema.js';
import updateSchema from '../../schemas/register.post.schema.js';

const router = express.Router();

/**
 * Route pour récupérer tous les utilisateurs.
 *    * GET /api/categories
   * @summary Get all categories
   * @tags Category
   * @return {[Category]} 200 - success response - application/json
 * @name /
 * @function
 * @memberof module:routers/user
 * @param {function} Controller.findAll - Contrôleur pour récupérer tous les utilisateurs.
 */
router.route('/')
    .get(validationMiddleware(getSchema, 'body'), wrapper(Controller.findAll.bind(Controller)));

/**
 * Route pour les opérations sur un utilisateur spécifique.
 * @name /:id
 * @function
 * @memberof module:routers/user
 * @param {number} id - L'identifiant de l'utilisateur.
 * @param {function} Controller.findById - Contrôleur pour récupérer un utilisateur par son identifiant.
 * @param {function} Controller.update - Contrôleur pour mettre à jour un utilisateur par son identifiant.
 * @param {function} Controller.delete - Contrôleur pour supprimer un utilisateur par son identifiant.
 */
router.route('/:id(\\d+)')
    .get(validationMiddleware(getSchema, 'body'), wrapper(Controller.findById.bind(Controller)))
    .patch(validationMiddleware(updateSchema, 'body'),wrapper(Controller.update.bind(Controller)))
    .delete(Controller.delete.bind(Controller));

export default router;