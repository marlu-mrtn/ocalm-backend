import client from '../config/pg.client.js';

//Ce fichier sert à la création d'une instance pour utiliser les dataMappers ensuite.
import AuthenticationDatamapper from './user.datamapper.js';
import PlacesDatamapper from './place.datamapper.js';
import TagsDatamapper from './tag.datamapper.js';

/**
 * Instance du datamapper pour les utilisateurs.
 * @type {Object}
 */
export const userDatamapper = new AuthenticationDatamapper(client);
/**
 * Instance du datamapper pour les lieux.
 * @type {Object}
 */
export const placeDatamapper = new PlacesDatamapper(client);
/**
 * Instance du datamapper pour les tags.
 * @type {Object}
 */
export const tagDatamapper = new TagsDatamapper(client);
