import express from 'express';
import Controller from '../../controllers/api/place.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validate from '../../middlewares/validation.middleware.js';
import updateSchema from '../../schemas/place.patch.schema.js';
import createSchema from '../../schemas/place.post.schema.js';

const router = express.Router();

router.route('/')
    /**
      * GET /places
        * Route pour récupérer touters les places.
        * @summary Affiche toutes les places
        * @tags place
        * @return {[place]} 200 - success response - application/json
    */
    .get(wrapper(Controller.findAll.bind(Controller)))
    /**
      * POST /places
        * Route pour créer une nouvelle place.
        * @summary Créé une nouvelle place
        * @tags place
        * @param {Input} id.path.required  - L'identifiant de la place.
        * @return {place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .post(validate(createSchema, 'body'),(Controller.create.bind(Controller)));

router.route('/:id(\\d+)')
    /**
      * GET /places/{id}
        * Route pour récupérer une place spécifique.
        * @summary Affiche une place spécifique
        * @tags place
        * @param {number} id.path.required  - L'identifiant de la place.
        * @return {user} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .get(wrapper(Controller.findById.bind(Controller)))
    /**
      * PATCH /places/{id}
        * Route pour les modifications sur une place spécifique.
        * @summary Modifie une place spécifique
        * @tags place
        * @param {number} id.path.required  - L'identifiant de la place.
        * @return {place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .patch(validate(updateSchema, 'body'),wrapper(Controller.update.bind(Controller)))
    /**
      * DELETE /places/{id}
        * Route pour les modifications sur une place spécifique.
        * @summary Supprime une place spécifique
        * @tags place
        * @param {number} id.path.required  - L'identifiant de la place.
        * @return {place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .delete(Controller.delete.bind(Controller));

router.route('/:id(\\d+)/favorite')
    /**
      * GET /places/{id}/favorite
        * Route pour récupérer tous les favoris d'un user
        * @summary Affiche tous les favoris d'un user
        * @tags favoris
        * @return {[place]} 200 - success response - application/json
    */
    .get(wrapper(Controller.favorite.bind(Controller)))
    /**
      * PATCH /places/{id}/favorite
        * Route pour retirer ou ajouter un favori
        * @summary Retire ou ajoute un favori
        * @tags favoris
        * @param {number} id.path.required  - L'identifiant de la place.
        * @return {place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .patch(validate(updateSchema, 'body'),wrapper(Controller.update.bind(Controller)));

export default router;
