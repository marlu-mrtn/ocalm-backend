import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

const client = new Pool({connectionString: process.env.DB_URL});

export default client;
