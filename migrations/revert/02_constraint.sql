-- Revert ocalm:02_constraint from pg

BEGIN;

ALTER TABLE "user"
  DROP CONSTRAINT "userEmailCheck",
  DROP CONSTRAINT "userPasswordCheck";

ALTER TABLE "place"
  DROP CONSTRAINT "placeNameCheck";

ALTER TABLE "tag"
  DROP CONSTRAINT "tagNameCheck",
  DROP CONSTRAINT "tagColorCheck";

ALTER TABLE "city"
  DROP CONSTRAINT "cityNameCheck",
  DROP CONSTRAINT "cityPostalCodeCheck",
  DROP CONSTRAINT "cityDepartmentCheck",
  DROP CONSTRAINT "cityRegionCheck";


COMMIT;
