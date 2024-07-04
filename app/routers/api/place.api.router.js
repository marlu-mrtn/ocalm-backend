import express from 'express';
import Controller from '../../controllers/api/place.api.controller.js' 

const router = express.Router();


router.route('/')
    .get(Controller.findAll.bind(Controller));
/*
placeRouter.get('/places', controller.getAllPlaces);
placeRouter.get('places/:id', controller.getOnePlace);
placeRouter.post('places', controller.postPlace);
placeRouter.patch('/places/:id', controller.updatePlace);
placeRouter.delete('/places/:id', controller.deletePlace);
*/
export default router;
