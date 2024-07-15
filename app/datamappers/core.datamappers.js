/**
 * Classe CoreDatamapper pour les opérations CRUD génériques.
 */
export default class CoreDatamapper {
    /**
     * Nom de la table en lecture.
     * @type {string|null}
     */
    static readTableName = null;

    /**
     * Nom de la table en écriture.
     * @type {string|null}
     */
    static writeTableName = null;

    /**
     * Instance unique de la classe (singleton).
     * @type {CoreDatamapper}
     */
    static _instance;

    /**
     * Constructeur du datamapper.
     * @param {Object} client - Le client de base de données.
     */
    constructor(client) {
        this.client = client;
        if(!this.constructor._instance){
            this.constructor._instance = this;
        }
        return this.constructor._instance;
    }


    /**
     * Récupère toutes les lignes d'une table
     * @returns {Promise<Array>}
     */
    async findAll() {
        const result = await this.client.query(`
        SELECT *
        FROM "${this.constructor.readTableName}"`);
        console.log(result.rows)
        return result.rows;
    }
    /**
     * Récupère la ligne d'une table en fonction de son ID
     * @param {number} id 
     * @returns {Promise<Object>} Contrairement à findAll, ici on ne retourne qu'une seule ligne du tableau et c'est un objet
     */
    async findById(id) {
        const result = await this.client.query(`
        SELECT *
        FROM "${this.constructor.readTableName}" 
        WHERE id = $1`,
        [id]);
        return result.rows[0];
    }

    /**
     * Crée une nouvelle ligne sur une table
     * @param {Object} input - Les différents paramètres demandés 
     * @returns {Promise<Object} La nouvelle ligne créée
     */
    async create(input) {
        const columnNames = Object.keys(input);
        // values = valeurs des colonnes
        const values = Object.values(input);
        // on créé les $1, $2, $3, etc.
        const valuesPosition = columnNames.map((_, index) => `$${index + 1}`).join(', ');

        const result = await this.client.query(`
        INSERT INTO "${this.constructor.writeTableName}" (${[...columnNames]})
        VALUES (${valuesPosition})
        RETURNING *, gps_location_latitude::float, gps_location_longitude::float`,
        values);

        return result.rows;
    }

    /**
     * Met à jour une ligne en fonction de son ID
     * @param {number} id - l'ID recherché 
     * @param {Object} input - Les données à changer 
     * @returns {Promise<Array>} La ligne mise à jour
     */
    async update(id, input) {
        const columnNames = Object.keys(input);
        // values = valeurs des colonnes
        const values = Object.values(input);
        // on créé les $2, $3, etc à partir du $2 car $1 est l'id dans le format SET
        const valuesPosition = columnNames.map((column, index) => `"${column}" = $${index + 2}`).join(', ');
        
        const result = await this.client.query(`
        UPDATE "${this.constructor.writeTableName}" 
        SET ${valuesPosition} , updated_at = NOW()
        WHERE id = $1
        RETURNING *`,
        [id, ...values]);

        return result.rows[0];
    }


    /**
     * Supprime une ligne en fonction de son ID
     * @param {number} id - L'ID de la ligne à supprimer 
     * @returns {Promise<boolean>} retourne true si des lignes ont été supprimé
     */
    async delete(id) {
        const result = await this.client.query(`
        DELETE FROM "${this.constructor.writeTableName}"
        WHERE id = $1`,
        [id]);

        return !!result.rowCount;
    }
}
