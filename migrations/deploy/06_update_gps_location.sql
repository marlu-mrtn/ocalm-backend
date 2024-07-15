-- Deploy ocalm:update_gps_location to pg

BEGIN;

ALTER TABLE place
ADD COLUMN gps_location_latitude DECIMAL(11, 8),
ADD COLUMN gps_location_longitude DECIMAL(11, 8);

ALTER TABLE place DROP COLUMN gps_location;

COMMIT;
