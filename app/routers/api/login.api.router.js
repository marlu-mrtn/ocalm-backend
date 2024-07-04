import express from 'express';
import controller from '../../controllers/api/user.api.controller.js';

const router = express.Router();

router.route('/')
    .post(controller.login.bind(controller));

export default router;
