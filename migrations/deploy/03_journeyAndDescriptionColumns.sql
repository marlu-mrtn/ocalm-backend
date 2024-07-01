-- Deploy ocalm:03_journeyAndDescriptionColumns to pg

BEGIN;

ALTER TABLE "place"
    ADD COLUMN "journey" TEXT,
    ADD COLUMN "description" TEXT;

COMMIT;
