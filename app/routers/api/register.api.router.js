import express from 'express';
import controller from '../../controllers/api/user.api.controller.js';    

const router = express.Router();

console.log('HELLO4');

router.post('/register', controller.signUp);
router.get('/register', controller.getAll);

export default router;