-- Verify ocalm:init on pg

BEGIN;

SELECT "name", "gpsLocation", "picture", "userId" FROM "place" WHERE false;

SELECT "name", "postalCode", "department", "region" FROM "city" WHERE false;

SELECT "username", "email", "password" FROM "user" WHERE false;

SELECT "name", "color" FROM "tag" WHERE false;

SELECT "placeId", "tagId" FROM "placeHasTag" WHERE false;

SELECT "placeId", "cityId" FROM "cityHasPlace" WHERE false;

ROLLBACK;
