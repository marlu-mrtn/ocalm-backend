import express from 'express';
import router from './index.api.router.js'
import controller from '../../controllers/authentication.controller.js';

const authenticationRouter = express.Router();

authenticationRouter.post('/login', controller.login);
authenticationRouter.post('/register', controller.authentication);

router.route('/user/:id(\\d+)')
    .get(controller.getInformation)
    .patch(controller.updateUser)
    .delete(controller.deleteUser);

export default authenticationRouter;