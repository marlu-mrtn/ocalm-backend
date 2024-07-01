-- Deploy ocalm:02_constraint to pg

BEGIN;

ALTER TABLE "user" 
  ADD CONSTRAINT "userMailCheck" CHECK ("mail" ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'),
  ADD CONSTRAINT "userPasswordCheck" CHECK ("password" ~ '^(?=.*\d)(?=.*[\w])(?=.*[\w])(?=.*[\w]).{8,}$');

ALTER TABLE "place"
  ADD CONSTRAINT "placeNameCheck" CHECK ("place"."name" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$');

ALTER TABLE "tag"
  ADD CONSTRAINT "tagNameCheck" CHECK ("tag"."name" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$'),
  ADD CONSTRAINT "tagColorCheck" CHECK ("color" ~ '^#[a-zA-Z\d]{0,8}$');

ALTER TABLE "city"
  ADD CONSTRAINT "cityNameCheck" CHECK ("city"."name" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$'),
  ADD CONSTRAINT "cityPostalCodeCheck" CHECK ("postalCode" ~ '^[\d]{0,6}'),
  ADD CONSTRAINT "cityDepartmentCheck" CHECK ("department" ~ '^[\d]{0,2}'),
  ADD CONSTRAINT "cityRegionCheck" CHECK ("region" ~ '^[a-zA-Z]+([\s-][a-zA-ZéèêÉÈÊàÀôÔûÛ]+)*$');

COMMIT;
