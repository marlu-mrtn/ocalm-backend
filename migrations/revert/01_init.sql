-- Revert ocalm:init from pg

BEGIN;

DROP TABLE "user","place","tag","city","placeHasTag","cityHasPlace";

COMMIT;
