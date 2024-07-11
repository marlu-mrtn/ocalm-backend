import express from 'express';
import Controller from '../../controllers/api/place.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';
import getSchema from '../../schemas/place.get.schema.js';
import updateSchema from '../../schemas/place.patch.schema.js';
import createSchema from '../../schemas/place.post.schema.js';

const router = express.Router();

/**
 * Routeur pour les opérations de place.
 * @module routers/place
 */

/**
 * Route pour récupérer toutes les places et créer une nouvelle place.
 * @name /
 * @function
 * @memberof module:routers/place
 * @param {function} Controller.findAll - Contrôleur pour récupérer tous les lieux.
 * @param {function} Controller.create - Contrôleur pour créer un nouveau lieu.
 */
router.route('/')
    .get(validationMiddleware(getSchema, 'body'),wrapper(Controller.findAll.bind(Controller)))
    .post(validationMiddleware(createSchema, 'body'),wrapper(Controller.create.bind(Controller)));


/**
 * Route pour récupérer, mettre à jour et supprimer un lieu via son ID.
 * @name /:id
 * @function
 * @memberof module:routers/place
 * @param {function} Controller.findById - Contrôleur pour récupérer un lieu via son ID.
 * @param {function} Controller.update - Contrôleur pour mettre à jour un lieu via son ID.
 * @param {function} Controller.delete - Contrôleur pour supprimer un lieu via son ID.
 */
router.route('/:id(\\d+)')
    .get(validationMiddleware(getSchema, 'body'),wrapper(Controller.findById.bind(Controller)))
    .patch(validationMiddleware(updateSchema, 'body'),wrapper(Controller.update.bind(Controller)))
    .delete(Controller.delete.bind(Controller));

export default router;
