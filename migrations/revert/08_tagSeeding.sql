-- Revert ocalm:08_tagSeeding from pg

BEGIN;

TRUNCATE FROM "tag";

ALTER TABLE "tag" 
  ADD CONSTRAINT IF NOT EXISTS "tagNameCheck" CHECK ("tag"."name" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$'),
  ADD CONSTRAINT IF NOT EXISTS "tagColorCheck" CHECK ("color" ~ '^#[a-zA-Z\d]{0,8}$');

COMMIT;
