import CoreController from './core.api.controller.js';
import { placeDatamapper } from '../../datamappers/index.datamapper.js';

/**
 * Controlleur Place qui hérite du Corecontroller.
 * Les static seront ici définis pour la table place
 */
export default class PlacesController extends CoreController {

    /**
     * Nom de l'entité à utiliser.
     * @type {string}
     */
    static entityName = "place";
    /**
     * Le datamapper associé.
     * @type {Object} 
     */
    static properDatamapper = placeDatamapper;

}
