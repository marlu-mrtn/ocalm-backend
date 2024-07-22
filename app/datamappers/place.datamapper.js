import CoreDatamapper from './core.datamappers.js';

/**
 * Datamapper pour les entités "place".
 * Hérite des méthodes de base du CoreDatamapper.
 */
export default class PlaceDatamapper extends CoreDatamapper {
    /**
     * Nom de la table en lecture.
     * @type {string}
     */
    static readTableName = 'place';

    /**
     * Nom de la table en écriture.
     * @type {string}
     */
    static writeTableName = 'place';


    /**
     * Trouve tous les favoris d'un utilisateur
     * @param {string} user_id - l'ID de l'utilisateur qui possède les favoris
     * @returns {Promise<Object>} - Renvoie un objet avec les favoris de l'utilisateur
     */
    async getAllFavorites(user_id) {
        const result = await this.client.query(`
        SELECT DISTINCT
	    "${this.constructor.readTableName}"."id" AS ${this.constructor.readTableName}_id,
	    "${this.constructor.readTableName}"."name" AS ${this.constructor.readTableName},
        "userHasFavoritesPlaces"."id" AS fav_id 
        FROM "${this.constructor.readTableName}"
        JOIN "userHasFavoritesPlaces"
        	ON "userHasFavoritesPlaces"."place_id" = "${this.constructor.readTableName}"."id"
        JOIN "user"
        	ON "user"."id" = "userHasFavoritesPlaces"."user_id"
        WHERE "userHasFavoritesPlaces"."user_id" = $1
        `, [user_id]);
        
        return result.rows;

    }

    /**
     * Créé un nouveau favori
     * @param {Object} place_id - L'ID de la place à ajouter en favori
     * @param {Object} user_id - L'ID de l'utilisateur qui ajoute le favori
     * @returns {Promise<Object} Renvoie l'ID de la place, l'ID du user et l'ID du favori
     */
    async createFav(place_id, user_id) {
        const result = await this.client.query(`
        INSERT INTO "userHasFavoritesPlaces" (place_id, user_id)
        VALUES ($1, $2)
        RETURNING
        "place_id",
        "id" AS "fav_id", (
            SELECT "name" 
            FROM "place" 
            WHERE "id" = $1
        ) AS "place"
        `, [place_id, user_id]);

        return result.rows[0];
    }

    /**
     * Supprime un favori
     * @param {number} id - L'ID de l'utillisateur qui possède le favori
     * @param {number} fav_id - L'ID du favori
     * @returns {Promise<boolean>} Renvoie l'ID de la place, l'ID du user et l'ID du favori
     */
    async deleteFav(id, fav_id) {
        const result = await this.client.query(`
        DELETE FROM "userHasFavoritesPlaces"
        WHERE user_id = $1
        AND id = $2
        RETURNING 
            "place_id",
            "id" AS "fav_id", (
                SELECT "name" 
                FROM "place" 
                WHERE "id" = "userHasFavoritesPlaces"."place_id"
            ) AS "place"
        `, [id, fav_id]);

        return result.rows[0];
    }

    async getAllWithTags() {
            const result = await this.client.query(`
            SELECT 
            "place".*,
            "tag"."name" AS "tag",
            "tag"."color" AS "tag_color"
            FROM "place"
            JOIN "placeHasTag"
                ON "placeHasTag"."place_id" = "place"."id"
            JOIN "tag"
                ON "tag"."id" = "placeHasTag"."tag_id"`);

        return result.rows;
    }
}
