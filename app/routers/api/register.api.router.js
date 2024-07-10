import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';

const router = express.Router();

/**
 * Routeur pour les opérations de l'utilisateur.
 * @module routers/user
 */

/**
 * Route pour inscrire un nouvel utilisateur et récupérer tous les utilisateurs.
 * @name /register
 * @function
 * @memberof module:routers/user - le routeur découle du routeur principal
 * @param {function} Controller.signUp - Contrôleur pour inscrire un nouvel utilisateur.
 * @param {function} Controller.findAll - Contrôleur pour récupérer tous les utilisateurs.
 */
router.route('/')
    .post(Controller.signUp.bind(Controller))
    .get(Controller.findAll.bind(Controller));

export default router;