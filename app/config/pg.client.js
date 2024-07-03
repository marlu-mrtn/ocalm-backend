import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

//Nous choisissons d'utiliser une connexion de type Pool afin de pouvoir multiplier les requêtes sans devoir attendre un autre utilisateur/requête.

const client = new Pool({connectionString: process.env.DB_URL});

export default client;
