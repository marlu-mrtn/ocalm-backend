-- Deploy ocalm:03_journeyAndDescriptionColumns to pg

BEGIN;

ALTER TABLE "place"
    ADD COLUMN "journey" text[],
    ADD COLUMN "description" text;

COMMIT;
