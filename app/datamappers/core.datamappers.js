export default class CoreDatamapper {
    static readTableName = null;
    static writeTableName = null;
    static _instance;

    // Ce constructeur (singleton) servira de base de conception pour les datamapper.

    constructor(client) {
        this.client = client;
        if(!this.constructor._instance){
            this.constructor._instance = this;
        }
        return this.constructor._instance;
    }

    async findAll() {
        const result = await this.client.query(`
        SELECT *
        FROM "${this.constructor.readTableName}"`);
        console.log(result.rows)
        return result.rows;
    }

    async findById(id) {
        const result = await this.client.query(`
        SELECT *
        FROM ${this.constructor.readTableName} 
        WHERE id = $1`,
        [id]);
        return result.rows[0];
    }

    async create(input) {
        const result = await this.client.query(`
        INSERT INTO ${this.constructor.writeTableName}
        VALUES ($1)`,
        [input]);
        return result.rows[0];
    }

    async update(id, input) {
        const result = await this.client.query(`
        UPDATE ${this.constructor.writeTableName}
        SET ($2)
        WHERE id = $1`,
        [id, input]);
        return result.rows[0];
    }

    async delete(id) {
        const result = await this.client.query(`
        DELETE FROM ${this.constructor.writeTableName}
        WHERE id = $1`,
        [id]);

        return !!result.rowCount;
    }
}
