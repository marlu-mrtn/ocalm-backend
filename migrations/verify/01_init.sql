-- Verify ocalm:init on pg

BEGIN;

SELECT "name", "gps_location", "picture", "user_id" FROM "place" WHERE false;

SELECT "name", "postal_code", "department", "region" FROM "city" WHERE false;

SELECT "username", "email", "password" FROM "user" WHERE false;

SELECT "name", "color" FROM "tag" WHERE false;

SELECT "place_id", "tag_id" FROM "placeHasTag" WHERE false;

SELECT "place_id", "city_id" FROM "cityHasPlace" WHERE false;

ROLLBACK;
