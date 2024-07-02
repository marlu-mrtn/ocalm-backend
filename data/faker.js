import { faker } from "@faker-js/faker";
import client from '../app/config/pg.client.js'

client.connect();

const generateFakeData = async () => {
    for (let i = 0; i < 100; i++) {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password({ length: 10})

        await client.query(
            'INSERT INTO "user" (username, mail, password) VALUES ($1, $2, $3)',
            [name, email, password],
        );
    }
    for (let i = 0; i < 10; i++) {
        const name = faker.location.county();
        const userId = await client.query('SELECT id FROM "user" ORDER BY RANDOM() LIMIT 1');

        await client.query(
            'INSERT INTO "place" (name, "userId") VALUES ($1, $2)',
            [name, userId.rows[0].id],
        );
    }
    client.end();
};

generateFakeData()
    .then(() => console.log("Data generation completed"))
    .catch((err) => console.error("Error generating data", err));
