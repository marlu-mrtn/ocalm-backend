import CoreDatamapper from './core.datamappers.js';

/**
 * Datamapper pour les entités "place".
 * Hérite des méthodes de base du CoreDatamapper.
 */
export default class PlaceDatamapper extends CoreDatamapper {
    /**
     * Nom de la table en lecture.
     * @type {string}
     */
    static readTableName = 'place';

    /**
     * Nom de la table en écriture.
     * @type {string}
     */
    static writeTableName = 'place';
}