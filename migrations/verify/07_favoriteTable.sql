-- Verify ocalm:07_favoriteTable on pg

BEGIN;

SELECT "place_id", "user_id" FROM "userHasFavoritesPlaces" WHERE false;

ROLLBACK;
