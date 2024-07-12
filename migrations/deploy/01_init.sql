-- Deploy ocalm:init to pg

BEGIN;

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" text NOT NULL UNIQUE,
    "email"  text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "place" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    "gps_location" decimal,
    "picture" text[],
    "user_id" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "tag" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    "color" VARCHAR(6),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "city" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "postal_code" int,
    "department" int,
    "region" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "placeHasTag" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "place_id" int NOT NULL REFERENCES "place"("id") ON DELETE CASCADE,
    "tag_id" int NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "cityHasPlace" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "place_id" int NOT NULL REFERENCES "place"("id") ON DELETE CASCADE,
    "city_id" int NOT NULL REFERENCES "city"("id") ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

COMMIT;
