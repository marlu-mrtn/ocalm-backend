import CoreDatamapper from './core.datamappers.js';

export default class UserDatamapper extends CoreDatamapper {
    static readTableName = 'user';
    static writeTableName = 'user';

    //Cette méthode est rajoutée ici pour retrouver un email qui est lié à la table user.
    //Cette méthode ne pouvait pas se mettre dans le CoreDatamapper car elle n'est pas liée à une table mais à un attribut de table.

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
