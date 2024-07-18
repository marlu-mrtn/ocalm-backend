import 'dotenv/config';
import logger from './app/utils/logger.utils.js';

import { exec } from 'child_process';

const hostname = process.env.DB_HOST;
const port = process.env.DB_PORT
const username = process.env.DB_USER;
const dbname = process.env.DB_NAME;
const backupFile = 'backupfile.dump';

const command = `pg_dump -h ${hostname} -p ${port} -U ${username} -W -F c -b -v -f ${backupFile} ${dbname}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        logger.error(`Erreur lors de la sauvegarde : ${error.message}`);
        return;
    }
    if (stderr) {
        logger.error(`Erreur : ${stderr}`);
        return;
    }
    logger.info(`Sauvegarde réussie : ${stdout}`);
});