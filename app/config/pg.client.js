import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

console.log(process.env.DB_URL);
const client = new Pool({connectionString: process.env.DB_URL});

export default client;
