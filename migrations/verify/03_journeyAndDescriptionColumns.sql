-- Verify ocalm:03_journeyAndDescriptionColumns on pg

BEGIN;

SELECT "journey" FROM "place" WHERE false;
SELECT "description" FROM "place" WHERE false;

ROLLBACK;
