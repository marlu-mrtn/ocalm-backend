import express from 'express';
import router from './index.api.router.js';

const placeRouter = express.Router();

placeRouter.get('/places', controller.getAllPlaces);
placeRouter.get('places/:id', controller.getOnePlace);
placeRouter.post('places', controller.postPlace);
placeRouter.patch('/places/:id', controller.updatePlace);
placeRouter.delete('/places/:id', controller.deletePlace);

export default placeRouter;