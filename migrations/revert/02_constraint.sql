-- Revert ocalm:02_constraint from pg

BEGIN;

ALTER TABLE "user"
  DROP CONSTRAINT "userUsernameCheck",
  DROP CONSTRAINT "userMailCheck",
  DROP CONSTRAINT "userPasswordCheck";

ALTER TABLE "place"
  DROP CONSTRAINT "placeNameCheck",
  DROP CONSTRAINT "placeGpsLocationCheck",
  DROP CONSTRAINT "placePictureCheck";

ALTER TABLE "tag"
  DROP CONSTRAINT "tagNameCheck",
  DROP CONSTRAINT "tagColorCheck";

ALTER TABLE "city"
    DROP CONSTRAINT "cityNameCheck",
    DROP CONSTRAINT "cityPostalCodeCheck",
    DROP CONSTRAINT "cityDepartmentCheck",
    DROP CONSTRAINT "cityRegionCheck";


COMMIT;
