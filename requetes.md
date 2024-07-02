User + lieux + tag + ville


SELECT DISTINCT 
	"user"."username" AS "user",
	"place"."name" AS "place",
	"tag"."name" AS "tag",
	"city"."name" AS "city"
FROM "place"
JOIN "placeHasTag"
	ON "placeHasTag"."placeId" = "place"."id"
JOIN "cityHasPlace"
	ON "cityHasPlace"."placeId" = "placeHasTag"."placeId"
JOIN "city"
	ON "city"."id" = "cityHasPlace"."cityId"
JOIN "tag"
	ON "tag"."id" = "placeHasTag"."tagId"
JOIN "user"
	ON "user"."id" = "place"."userId"
WHERE "place"."id" = 3;