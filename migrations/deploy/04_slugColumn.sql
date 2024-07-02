-- Deploy ocalm:04_slugColumn to pg

BEGIN;

ALTER TABLE "place"
    ADD COLUMN "slug" text;

COMMIT;
