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
        FROM "${this.constructor.readTableName}" 
        WHERE id = $1`,
        [id]);
        return result.rows[0];
    }

    async create(input) {
        const columnNames = Object.keys(input);
        // values = valeurs des colonnes
        const values = Object.values(input);
        // Si plusieurs colonnes, on les sépare par des virgules
        const columns = columnNames.join(', ');
        // on créé les $1, $2, $3, etc.
        const valuesPosition = columnNames.map((_, index) => `$${index + 1}`).join(', ');

        const result = await this.client.query(`
        INSERT INTO "${this.constructor.writeTableName}" (${columns})
        VALUES (${valuesPosition})
        RETURNING *`,
        values);

        return result.rows;
    }


    async update(id, input) {
        const columnNames = Object.keys(input);
        console.log(columnNames);
        // values = valeurs des colonnes
        const values = Object.values(input);
        console.log(values)

        // on créé les $2, $3, etc à partir du $2 car $1 est l'id
        const valuesPosition = columnNames.map((column, index) => `"${column}" = $${index + 2}`).join(', ');
        console.log(valuesPosition)
        
        const result = await this.client.query(`
        UPDATE "${this.constructor.writeTableName}" 
        SET ${valuesPosition}
        WHERE id = $1
        RETURNING *`,
        [id, ...values]);

        return result.rows[0];
    }

    async delete(id) {
        const result = await this.client.query(`
        DELETE FROM "${this.constructor.writeTableName}"
        WHERE id = $1`,
        [id]);

        return !!result.rowCount;
    }
}
