import CoreDatamapper from './core.datamappers.js';

export default class UserDatamapper extends CoreDatamapper {
    /**
     * Nom de la table lue
     * @type {string}
     */
    static readTableName = 'user';
    /**
     * Nom de la table écrite
     * @type {string}
     */
    static writeTableName = 'user';

    //Cette méthode est rajoutée ici pour retrouver un email qui est lié à la table user.
    //Cette méthode ne pouvait pas se mettre dans le CoreDatamapper car elle n'est pas liée à une table mais à un attribut de table.

    /**
     * Trouve un utilisateur via son email et non via son id
     * @param {string} email - l'email de la personne à rechercher
     * @returns {Promise<Object>} - Renvoie un objet avec les données de l'utilisateur
     */
    async findByEmail(email) {
        const result = await this.client.query(`
        SELECT * 
        FROM "${this.constructor.readTableName}"
        WHERE email = $1
        `,
        [email]);

        return result.rows[0];
    }

}
