import CoreDatamapper from './core.datamappers.js';

export default class TagDatamapper extends CoreDatamapper {
    /**
     * Nom de la table lue
     * @type {string}
     */
    static readTableName = 'tag';
    /**
     * Nom de la table écrite
     * @type {string}
     */
    static writeTableName = 'tag';

}
