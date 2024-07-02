-- Revert ocalm:04_slugColumn from pg

BEGIN;

ALTER TABLE "place"
    DROP COLUMN "slug";

COMMIT;
