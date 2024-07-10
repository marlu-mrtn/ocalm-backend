-- Deploy ocalm:05_passwordStrongerRegex to pg

BEGIN;

ALTER TABLE "user" 
  DROP CONSTRAINT IF EXISTS "strongUserPasswordCheck",
  ADD CONSTRAINT "strongUserPasswordCheck" CHECK ("password" ~ '^([a-z]*)([A-Z]*)([0-9]*)([!@#$%&*_\-?]*).{8,}$');

COMMIT;
