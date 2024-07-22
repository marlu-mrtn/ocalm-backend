import express from 'express';
import Controller from '../../controllers/api/place.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validate from '../../middlewares/validation.middleware.js';
import updateSchema from '../../schemas/place.patch.schema.js';
import createFavSchema from '../../schemas/userHasFavoritesPlaces.post.schema.js';
import createSchema from '../../schemas/place.post.schema.js';
import isAuth from '../../helpers/jwt.helpers.js';


const router = express.Router();


/**
 * @typedef {object} Place
 * @property {integer} id.required - ID de la place
 * @property {string} name - Nom de la place
 * @property {string} description - Description de la place
 * @property {array<string>} journey - Itinéraire de la place
 * @property {array<string>} picture - Photos de la place
 * @property {integer} user_id - ID de l'utilisateur
 * @property {string} created_at - Date de création
 * @property {string} updated_at - Date de mise à jour
 * @property {string} slug - Slug de la place
 * @property {string} gps_location_latitude - Latitude GPS de la place
 * @property {string} gps_location_longitude - Longitude GPS de la place
 */


router.route('/')
    /**
      * GET /places
        * @summary Affiche toutes les places
        * @tags place
        * @return {array<Place>} 200 - success response - application/json
    */ 
    //! Penser à revoir regex dans contraintes sqitch pour les tags --------------------------------
    .get(wrapper(Controller.getAllWithTags.bind(Controller)))
    /**
      * POST /places
        * @summary Créé une nouvelle place
        * @tags place
        * @param {Input} id.path.required  - L'identifiant de la place.
        * @return {Place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .post(isAuth.verifyToken, validate(createSchema, 'body'),(Controller.create.bind(Controller)));

router.route('/:id(\\d+)')
    /**
      * GET /places/{id}
        * @summary Affiche une place spécifique
        * @tags place
        * @param {number} id.path.required  - L'identifiant de la place.
        * @return {Place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .get(isAuth.verifyToken, wrapper(Controller.findById.bind(Controller)))
    /**
      * PATCH /places/{id}
        * @summary Modifie une place spécifique
        * @tags place
        * @param {number} id.path.required  - L'identifiant de la place.
        * @return {Place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .patch(isAuth.verifyToken, validate(updateSchema, 'body'),wrapper(Controller.update.bind(Controller)))
    /**
      * DELETE /places/{id}
        * @summary Supprime une place spécifique
        * @tags place
        * @param {number} id.path.required  - L'identifiant de la place.
        * @return {Place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .delete(isAuth.verifyToken, wrapper(Controller.delete.bind(Controller)));

router.route('/favorite/:id(\\d+)')
    /**
      * GET /places/favorite/{id}
        * @summary Affiche tous les favoris d'un user
        * @tags favoris
        * @return {[Place]} 200 - success response - application/json
    */
    .get(isAuth.verifyToken,wrapper(Controller.getAllFavorites.bind(Controller)))
    /**
       * POST /places/favorite/{id}
         * @summary Créé un favori
         * @tags favoris
         * @return {Place} 200 - success response - application/json
         * @return {ApiError} 400 - Bad request response - application/json
         * @return {ApiError} 404 - Category not found - application/json
        */
    .post(isAuth.verifyToken, validate(createFavSchema, 'body'),wrapper(Controller.createFav.bind(Controller)))

router.route('/favorite/:id(\\d+)/:fav_id(\\d+)')
    /**
      * DELETE /places/favorite/{id}/{fav_id}
        * @summary Supprime un favori spécifique
        * @tags favoris
        * @param {number} id.path.required  - L'identifiant du user.
        * @param {number} fav_id.path.required  - L'identifiant du favori
        * @return {Place} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .delete(isAuth.verifyToken, wrapper(Controller.deleteFav.bind(Controller)));

export default router;
