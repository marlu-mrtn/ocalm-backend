-- Verify ocalm:03_journeyAndDescriptionColumns on pg

BEGIN;

SELECT "journey" FROM "place" WHERE "journey" false;
SELECT "description" FROM "place" WHERE "description" false;

ROLLBACK;
