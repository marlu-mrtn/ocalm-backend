import express from 'express';
import router from './index.api.router.js';

router.get('/places', controller.getAllPlaces);
router.get('places/:id', controller.getOnePlace);
router.post('places', controller.postPlace);
router.patch('/places/:id', controller.updatePlace);
router.delete('/places/:id', controller.deletePlace);

export default placeRouter;