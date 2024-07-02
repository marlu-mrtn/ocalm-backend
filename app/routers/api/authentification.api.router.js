import express from 'express';
import router from './index.api.router';


router.post('/login', controller.login);
router.post('/register', controller.authentification);
router.get('/user/:id', controller.getInformation);
router.patch('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.deleteUser);

export default authentificationRouter;