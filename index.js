import 'dotenv/config';
import pkg from 'pg';
import { faker } from '@faker-js/faker';

const { Client } = pkg;

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

const generateFakeData = async () => {
    for (let i = 0; i < 100; i++) {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password({ length: 20 })

        await client.query(
            'INSERT INTO "user" (username, mail, password) VALUES ($1, $2, $3)',
            [name, email, password],
        );
    }

    client.end();
};


generateFakeData()
    .then(() => console.log("Data generation completed"))
    .catch((err) => console.error("Error generating data", err));
