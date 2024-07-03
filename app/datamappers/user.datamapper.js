import CoreDatamapper from './core.datamappers.js';

export default class UserDatamapper extends CoreDatamapper {
    static readTableName = 'user';
    static writeTableName = 'user';

    async findByEmail(email) {
        const result = await this.client.query(`
        SELECT * 
        FROM "${this.constructor.readTableName}"
        WHERE mail = $1`, 
        [email]);
        return result.rows;
    }
}