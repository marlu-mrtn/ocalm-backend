import ApiError from '../../errors/api.error.js';

/**
 * CoreController est une classe de contrôleur qui va servir de base pour toutes les opérations classiques de notre API
 */
export default class CoreController {

    /**
     * Nom de l'entité à utiliser
     * @type {string|null}
     */
    static entityName = null;

    /**
     * Le datamapper associé
     * @type {Object|null}
     */
    static properDatamapper = null;

    /**
     * Méthode pour récupérer tous les éléments
     * @param {*} _ - Objet de requête (non utilisé ici)
     * @param {*} res - Objet de réponse
     * @returns {Promise<Array} Toutes les données
     */
    static async findAll(_, res) {
        const rows = await this.properDatamapper.findAll();
        
        return res.json({ data: rows });
    }

    /**
     * Méthode pour récupérer un élément via son id
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     * @returns {Promise<Object>} Les données récupérées.
     */
    static async findById(req, res, next) {
        const { id } = req.params;
        const row = await this.properDatamapper.findById(id);
        if (!row) {
            return next(new ApiError(`${this.entityName} introuvable`, {status: 404}));
        }

        return res.json({ data: row });
    }

    /**
     * Crée une nouvelle entité.
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     * @returns {Promise<Object>} Les données créées.
     */
    static async create(req, res,) {
        const input = req.body;
        const row = await this.properDatamapper.create(input);

        return res.status(201).json({ data: row });
    }


    /**
     * Met à jour une entité par son ID.
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     * @returns {Promise<Object>} Les données mises à jour.
     */
    static async update(req, res, next) {
        const { id } = req.params;
        const input = req.body;
        const row = await this.properDatamapper.update(id, input);
        if (!row) {
            return next(new ApiError(`${this.entityName} introuvable`, {status: 404}));
        }

        return res.json({ data: row });
    }

    /**
     * Supprime une entité par son ID.
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     * @returns {Promise<void>} 
     */
    static async delete(req, res, next) {
        const { id } = req.params;
        const deleted = await this.properDatamapper.delete(id);
        if (!deleted) {
            return next(new ApiError(`${this.entityName} introuvable`, {status: 404}));
        }

        return res.status(204).json();
    }
}
