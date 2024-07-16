import express from 'express';
import controller from '../../controllers/api/user.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';
import validate from '../../middlewares/validation.middleware.js';
import createSchema from '../../schemas/login.post.schema.js';

const router = express.Router();

router.route('/')
    /**
     * POST /login
     * @summary Connecte un utilisateur.
     * @tags login
     * @param {object} request.body.required - Les informations de connexion de l'utilisateur - application/json
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .post(validate(createSchema, 'body'), wrapper(controller.login.bind(controller)));

export default router;


