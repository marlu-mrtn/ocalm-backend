-- Deploy ocalm:04_slugColumn to pg

BEGIN;

ALTER TABLE "place"
    ADD COLUMN "slug" text,
    ADD CONSTRAINT "placeSlugCheck" CHECK ("place"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$');


COMMIT;
