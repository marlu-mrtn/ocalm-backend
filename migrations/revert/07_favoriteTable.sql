-- Revert ocalm:07_favoriteTable from pg

BEGIN;

DROP TABLE IF EXISTS "favorite" CASCADE;

COMMIT;
