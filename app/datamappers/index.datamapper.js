import client from '../config/pg.client.js';

import AuthenticationDatamapper from './user.datamapper.js';
// import placeDatamapper from './place.datamapper.js';

export const userDatamapper = new AuthenticationDatamapper(client);
// export const placeDatamapper = new PlaceDatamapper(client);