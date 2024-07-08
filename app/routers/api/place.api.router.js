import express from 'express';
import Controller from '../../controllers/api/place.api.controller.js' ;

const router = express.Router();


router.route('/')
    .get(Controller.findAll.bind(Controller))
    .post(Controller.create.bind(Controller));
router.route('/:id(\\d+)')
    .get(Controller.findById.bind(Controller))
    .patch(Controller.update.bind(Controller))
    .delete(Controller.delete.bind(Controller));

export default router;
