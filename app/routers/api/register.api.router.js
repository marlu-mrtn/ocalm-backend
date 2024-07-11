import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validate from '../../middlewares/validation.middleware.js';
import createSchema from '../../schemas/register.post.schema.js';

const router = express.Router();

router.route('/')
    /**
      * POST /register
        * Route pour s'inscrire.
        * @summary Créé un nouvel utilisateur
        * @tags register
        * @param {number} id.path.required  - L'identifiant de l'utilisateur.
        * @return {user} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .post(validate(createSchema, 'body'),wrapper(Controller.signUp.bind(Controller)));

export default router;