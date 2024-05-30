-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "city" VARCHAR (50) NOT NULL,
	"state" VARCHAR (2) NOT NULL,
	"email" VARCHAR (150) NOT NULL
);

CREATE TABLE "user_birdlist" (
    "id" SERIAL PRIMARY KEY,
    "user_id" integer REFERENCES "user",
    "bird_sp" integer REFERENCES "bird_species",
    "city" VARCHAR (50) NOT NULL,
	"state" VARCHAR (2) NOT NULL,
    "date" date,
    "notes" VARCHAR (2000)
);

CREATE TABLE "bird_species" (
    "id" SERIAL PRIMARY KEY,
    "sp_code" VARCHAR (10),
    "common_name" VARCHAR (500),
    "scientific_name" VARCHAR (1000),
    "order" VARCHAR (1000),
    "family_sci" VARCHAR (1000),
    "family_com" VARCHAR (1000)
);
INSERT INTO "bird_species" ("sp_code", "common_name", "scientific_name", "order", "family_com", "family_sci")
VALUES ('emu1', 'Emu', 'Dromaius novaehollandiae', 'Casuariiformes', 'Cassowaries and Emu', 'Casuariidae'),
('bbwduc', 'Black-bellied Whistling-Duck', 'Dendrocygna autumnalis', 'Anseriformes', 'Ducks, Geese, and Waterfowl', 'Anatidae'),
('bahgoo', 'Bar-headed Goose', 'Anser indicus', 'Anseriformes', 'Ducks, Geese, and Waterfowl', 'Anatidae');

