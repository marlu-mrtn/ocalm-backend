import express from 'express';
import controller from '../../controllers/api/user.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validate from '../../middlewares/validation.middleware.js';
import createSchema from '../../schemas/login.post.schema.js';

const router = express.Router();

router.route('/')
    /**
      * POST /login
        * Route pour se connecter.
        * @summary Connecte un utilisateur.
        * @tags login
        * @param {number} id.path.required  - L'identifiant de l'utilisateur.
        * @return {user} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .post(validate(createSchema, 'body'),wrapper(controller.login.bind(controller)));

export default router;
