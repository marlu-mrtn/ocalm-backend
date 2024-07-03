import express from 'express';
import Controller from '../../controllers/api/user.api.controller.js';

const router = express.Router();

console.log('HELLO4');

router.route('/')
    .post(Controller.signUp.bind(Controller))
    .get(Controller.findAll.bind(Controller))

export default router;
