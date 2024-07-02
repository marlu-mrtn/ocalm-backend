import client from '../config/pg.client.js';
import authenticationDatamapper from './authentication.datamapper.js';
import placeDatamapper from './place.datamapper.js';

export const authenticationDatamapper = new AuthenticationDatamapper(client);
export const placeDatamapperDatamapper = new PlaceDatamapper(client);