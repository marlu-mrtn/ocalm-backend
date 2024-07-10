import express from 'express';
import Controller from '../../controllers/api/place.api.controller.js';

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
    .get(Controller.findAll.bind(Controller))
    .post(Controller.create.bind(Controller));

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
    .get(Controller.findById.bind(Controller))
    .patch(Controller.update.bind(Controller))
    .delete(Controller.delete.bind(Controller));

export default router;
