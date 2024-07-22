import express from 'express';
import Controller from '../../controllers/api/tag.api.controller.js';
import wrapper from '../../middlewares/wrapper.middlewares.js';

const router = express.Router();

router.route('/')
    /**
      * GET /tags
        * Route pour avoir tous les tags.
        * @summary Affiche tous les tags
        * @tags tag
        * @return {Tag} 200 - success response - application/json
        * @return {ApiError} 400 - Bad request response - application/json
        * @return {ApiError} 404 - Category not found - application/json
    */
    .get(wrapper(Controller.findAll.bind(Controller)));


export default router;
