import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';

const router = express.Router();

router.route('/:id(\\d+)')
    .get(Controller.findAll.bind(Controller))
    .delete(Controller.delete.bind(Controller));


export default router;
