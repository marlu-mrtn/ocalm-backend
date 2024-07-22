-- Revert ocalm:update_gps_location from pg

BEGIN;

ALTER TABLE place
    DROP COLUMN IF EXISTS gps_location_latitude,
    DROP COLUMN IF EXISTS gps_location_longitude;

ALTER TABLE place 
    ADD COLUMN IF NOT EXISTS gps_location DECIMAL;

COMMIT;
