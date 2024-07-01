-- Deploy ocalm:02_constraint to pg

BEGIN;

ALTER TABLE "user" 
  ADD CONSTRAINT "userMailCheck" CHECK ("mail" ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'),
  ADD CONSTRAINT "userPasswordCheck" CHECK ("password" ~ '([a-zA-Z\d]+){8,}');

ALTER TABLE "place"
  ADD CONSTRAINT "placeNameCheck" CHECK ("place"."name" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$');

ALTER TABLE "tag"
  ADD CONSTRAINT "tagNameCheck" CHECK ("tag"."name" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$'),
  ADD CONSTRAINT "tagColorCheck" CHECK ("color" ~ '^#[a-zA-Z\d]{0,8}$');

ALTER TABLE "city"
  ADD CONSTRAINT "cityNameCheck" CHECK ("city"."name" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$'),
  ADD CONSTRAINT "cityRegionCheck" CHECK ("region" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$');

COMMIT;

