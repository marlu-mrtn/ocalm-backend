import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';

const router = express.Router();

router.route('/')
    .get(Controller.findAll.bind(Controller))
router.route('/:id(\\d+)')
    .get(Controller.findById.bind(Controller))
    .patch(Controller.update.bind(Controller))
    .delete(Controller.delete.bind(Controller));


export default router;
