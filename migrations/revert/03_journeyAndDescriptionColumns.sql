-- Revert ocalm:03_journeyAndDescriptionColumns from pg

BEGIN;

ALTER TABLE "place"
    DROP COLUMN "journey",
    DROP COLUMN  "description";

COMMIT;
