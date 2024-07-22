-- Deploy ocalm:08_tagSeeding to pg

BEGIN;

ALTER TABLE "tag"
  DROP CONSTRAINT "tagNameCheck",
  DROP CONSTRAINT "tagColorCheck";

INSERT INTO "tag" ("name", "color")
VALUES
    ('Parc', 'DA7F62'),
    ('Lac', '3E71FF'),   
    ('Forêt', '88BC83'), 
    ('Rivière', '51CCF5'),
    ('Plage', 'ECD55C'),  
    ('Plaine', 'CBA0E6'),  
    ('Village', '9D6A3C'),
    ('Montagne', '426F33');

COMMIT;
