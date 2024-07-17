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
}