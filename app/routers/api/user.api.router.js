import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';

const router = express.Router();

router.route('/:id(\\d+)')
    .get(Controller.findById.bind(Controller))
    .delete(Controller.delete.bind(Controller));
    // .patch(Controller.updateUser.bind(Controller))
    // .delete(Controller.deleteUser.bind(Controller));

export default router;
