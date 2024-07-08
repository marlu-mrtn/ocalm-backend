-- Revert ocalm:05_passwordStrongerRegex from pg

BEGIN;

ALTER TABLE "user"
  DROP CONSTRAINT "strongUserPasswordCheck";

COMMIT;
