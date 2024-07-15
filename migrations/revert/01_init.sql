-- Revert ocalm:init from pg

BEGIN;

DROP TABLE IF EXISTS "user","place","tag","city","placeHasTag","cityHasPlace" CASCADE;

COMMIT;
