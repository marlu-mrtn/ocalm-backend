import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validate from '../../middlewares/validation.middleware.js';
import updateSchema from '../../schemas/register.post.schema.js';
import isAuth from '../../middlewares/jwt.middleware.js';


const router = express.Router();

router.route('/')
    /**
      * GET /user
        * Route pour récupérer tous les utilisateurs.
        * @summary Affiche tous les utilisateurs
        * @tags user
        * @return {[user]} 200 - success response - application/json
    */
    .get(isAuth.verifyToken, wrapper(Controller.findAll.bind(Controller)));

router.route('/:id(\\d+)')
    /**
      * GET /user/{id}
        * Route pour récupérer un utilisateur spécifique.
        * @summary Affiche un utilisateur spécifique
        * @tags user
        * @param {number} id.path.required  - L'identifiant de l'utilisateur.
        * @return {user} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .get(isAuth.verifyToken, wrapper(Controller.findById.bind(Controller)))
    /**
      * PATCH /user/{id}
        * Route pour les modifications sur un utilisateur spécifique.
        * @summary Modifie un utilisateur spécifique
        * @tags user
        * @param {number} id.path.required  - L'identifiant de l'utilisateur.
        * @return {user} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .patch(isAuth.verifyToken, validate(updateSchema, 'body'),wrapper(Controller.update.bind(Controller)))
    /**
      * DELETE /user/{id}
        * Route pour les modifications sur un utilisateur spécifique.
        * @summary Supprime un utilisateur spécifique
        * @tags user
        * @param {number} id.path.required  - L'identifiant de l'utilisateur.
        * @return {user} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .delete(isAuth.verifyToken, wrapper(Controller.delete.bind(Controller)));

export default router;


