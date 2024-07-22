import CoreController from './core.api.controller.js';
import { tagDatamapper } from '../../datamappers/index.datamapper.js';
import ApiError from '../../errors/api.error.js';

/**
 * Controlleur Place qui hérite du Corecontroller.
 * Les static seront ici définis pour la table place
 */
export default class TagsController extends CoreController {

    /**
     * Nom de l'entité à utiliser.
     * @type {string}
     */
    static entityName = "tag";
    /**
     * Le datamapper associé.
     * @type {Object}
     */
    static properDatamapper = tagDatamapper;

};
