export default class CoreController {

    static entityName = null;
    static properDatamapper = null;

    static async findAll(_, res) {
        const rows = await this.properDatamapper.findAll();
        return res.json({ data: rows });
    }


    static async findById(req, res) {
        const { id } = req.params;
        const row = await this.properDatamapper.findById(id);
        if (!row) {
            return res.status(404).json({ message: `${this.entityName} introuvable` });
        }
        return res.json({ data: row });
    }

    static async create(req, res) {
        const input = req.body;
        const row = await this.properDatamapper.create(input);
        return res.status(201).json({ data: row });
    }

    static async update(req, res) {
        const { id } = req.params;
        const input = req.body;
        const row = await this.properDatamapper.update(id, input);
        if (!row) {
            return res.status(404).json({ message: `${this.entityName} introuvable` });
        }
        return res.json({ data: row });
    }

    static async delete(req, res ) {
        const { id } = req.params;
        const deleted = await this.properDatamapper.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: `${this.entityName} introuvable` });
        }
        return res.status(204).json();
    }
}
