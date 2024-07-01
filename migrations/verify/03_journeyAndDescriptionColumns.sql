-- Verify ocalm:03_journeyAndDescriptionColumns on pg

BEGIN;

SELECT "journey", "description" FROM "place" WHERE false;

ROLLBACK;
