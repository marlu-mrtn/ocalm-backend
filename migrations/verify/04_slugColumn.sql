-- Verify ocalm:04_slugColumn on pg

BEGIN;

SELECT "slug" FROM "place" WHERE false;

ROLLBACK;
