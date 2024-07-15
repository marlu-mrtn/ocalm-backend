-- Verify ocalm:update_gps_location on pg

BEGIN;

SELECT "gps_location_latitude" FROM "place" WHERE false;
SELECT "gps_location_longitude" FROM "place" WHERE false;

ROLLBACK;
