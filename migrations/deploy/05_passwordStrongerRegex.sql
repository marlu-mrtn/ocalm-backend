-- Deploy ocalm:05_passwordStrongerRegex to pg

BEGIN;

ALTER TABLE "user" 
  DROP CONSTRAINT IF EXISTS "strongUserPasswordCheck",
  ADD CONSTRAINT "strongUserPasswordCheck" CHECK ("password" ~ '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*?]).{8,}');

COMMIT;
