import client from '../config/pg.client.js';

//Ce fichier sert à la création d'une instance pour utiliser les dataMappers ensuite.

import AuthenticationDatamapper from './user.datamapper.js';
import PlacesDatamapper from './place.datamapper.js';

export const userDatamapper = new AuthenticationDatamapper(client);
export const placeDatamapper = new PlacesDatamapper(client);
