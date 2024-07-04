import express from 'express';
import Controller from '../../controllers/api/place.controller.js' 

const placeRouter = express.Router();

placeRouter.get('/', Controller.findAll.bind(Controller))
console.log("passage par le router place");
/*
placeRouter.get('/places', controller.getAllPlaces);
placeRouter.get('places/:id', controller.getOnePlace);
placeRouter.post('places', controller.postPlace);
placeRouter.patch('/places/:id', controller.updatePlace);
placeRouter.delete('/places/:id', controller.deletePlace);
*/
export default placeRouter;
