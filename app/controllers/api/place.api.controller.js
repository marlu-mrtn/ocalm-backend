import CoreController from './core.api.controller.js';
import { placeDatamapper } from '../../datamappers/index.datamapper.js';
import ApiError from '../../errors/api.error.js';

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

    /**
     * Méthode pour récupérer les favoris d'un utilisateur via son id.
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     * @returns {Promise<Object>} Les données récupérées.
     */
    static async getAllFavorites(req, res, next) {
        const { id } = req.params;
        const rows = await this.properDatamapper.getAllFavorites(id);

        if (!rows) {
            return next(new ApiError(`Pas de ${this.entityName}s favorites`, {status: 404}));
        }

        res.status(200).json({ data: rows });
    };

    /**
     * Méthode pour ajouter un favori
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     * @returns {Promise<Object>} Les données créées.
     */
    static async createFav(req, res) {
        const { id } = req.params;
        const place_id = req.body.place_id;

        const row = await this.properDatamapper.createFav(place_id, id);

        return res.status(201).json({ data: row });
    };

    /**
     * Supprime un favori par son ID.
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     * @returns {Promise<void>}
     */
    static async deleteFav(req, res, next) {
        const { id } = req.params;
        const { fav_id } = req.params;
        const row = await this.properDatamapper.deleteFav(id, fav_id);

        if (!row) {
            return next(new ApiError(`Favoris introuvable`, {status: 404}));
        }

        return res.status(200).json({ data: row });

    };

}
