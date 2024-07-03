import express from 'express';
import controller from '../../controllers/api/authentication.api.controller.js';    

const router = express.Router();

router.route('/user/:id(\\d+)')
    .get(controller.getInformation)
    .patch(controller.updateUser)
    .delete(controller.deleteUser);

export default router;