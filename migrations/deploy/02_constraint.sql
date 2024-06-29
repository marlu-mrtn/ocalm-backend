-- Deploy ocalm:02_constraint to pg

BEGIN;

ALTER TABLE "user"
  -- ADD CONSTRAINT "userUsernameCheck" CHECK (username ~ '');
  X ADD CONSTRAINT "userMailCheck" CHECK (mail ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
  X ADD CONSTRAINT "userPasswordCheck" CHECK (password ~ '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');

ALTER TABLE "place"
  X ADD CONSTRAINT "placeNameCheck" CHECK (name ~ '^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$');
  -- ADD CONSTRAINT "placeGpsLocationCheck" CHECK (gpsLocation ~ '');
  -- ADD CONSTRAINT "placePictureCheck" CHECK (picture ~ '^[a-z0-9-]+$');

ALTER TABLE "tag"
  X ADD CONSTRAINT "tagNameCheck" CHECK (name ~ '^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$');
  X ADD CONSTRAINT "tagColorCheck" CHECK (color ~ '^#[a-zA-Z\d]{0,8}$');

ALTER TABLE "city"
  X ADD CONSTRAINT "cityNameCheck" CHECK (name ~ '^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$');
  X ADD CONSTRAINT "cityPostcodeCheck" CHECK (postcode ~ '^[a-zA-Z\d\s]{0,10}$');
  -- ADD CONSTRAINT "cityDepartmentCheck" CHECK (department ~ '^[\d]{0,5}');
  X ADD CONSTRAINT "cityRegionCheck" CHECK (region ~ '^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$');

COMMIT;
