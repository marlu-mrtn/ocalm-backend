-- Deploy ocalm:07_favoriteTable to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "userHasFavoritesPlaces" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "place_id" int NOT NULL REFERENCES "place"("id") ON DELETE CASCADE,
    "user_id" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

COMMIT;
