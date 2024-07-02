-- Deploy ocalm:init to pg

BEGIN;

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" text NOT NULL UNIQUE,
    "mail"  text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "place" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    "gpsLocation" decimal,
    "picture" text,
    "userId" int NOT NULL REFERENCES "user"("id"),
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
    "postalCode" int,
    "department" int,
    "region" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "placeHasTag" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "placeId" int NOT NULL REFERENCES "place"("id"),
    "tagId" int NOT NULL REFERENCES "tag"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "cityHasPlace" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "placeId" int NOT NULL REFERENCES "place"("id"),
    "cityId" int NOT NULL REFERENCES "city"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

COMMIT;
