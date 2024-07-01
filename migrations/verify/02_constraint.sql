-- Verify ocalm:02_constraint on pg

BEGIN;

SELECT "userNameCheck", "userMailCheck", "userPasswordCheck" FROM "user" WHERE false;

SELECT "placeNameCheck", "placeGpsLocationCheck", "placePictureCheck" FROM "place" WHERE false;

SELECT "tagNameCheck", "tagColorCheck" FROM "tag" WHERE false;

SELECT "cityNameCheck", "cityPostalCodeCheck", "cityDepartmentCheck", "cityRegionCheck" FROM "city" WHERE false;

ROLLBACK;
