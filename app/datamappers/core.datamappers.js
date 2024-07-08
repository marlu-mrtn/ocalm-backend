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
        const columnName = Object.keys(input);
        console.log(`column name : ${columnName}`)
        // values = valeurs des colonnes
        const values = Object.values(input);
        console.log(`values : ${values}`)
        // Si plusieurs colonnes, on les sépare par des virgules
        const columns = columnName.join(', ');
        console.log(`columns : ${columns}`)
        // on créé les $1, $2, $3, etc.
        const valuesPosition = columnName.map((_, index) => `$${index + 1}`).join(', ');
        console.log(`valuesPosition : ${valuesPosition}`)   
    
        const result = await this.client.query(`
        INSERT INTO "${this.constructor.writeTableName}" (${columns})
        VALUES (${valuesPosition})
        RETURNING *`
        , values);
    
        return result.rows;
    }

    async create({username, email, password}) {
        const result = await this.client.query(`
         INSERT INTO "${this.constructor.writeTableName}" (username, email, password)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [username, email, password]);
        return result.rows;
    }

    async update(id, input) {
        const result = await this.client.query(`
        UPDATE "${this.constructor.writeTableName}"
        SET ($2)
        WHERE id = $1`,
        [id, input]);
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
