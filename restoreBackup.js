import 'dotenv/config';

import { exec } from 'child_process';

const hostname = process.env.DB_HOST;
const port = process.env.DB_PORT
const username = process.env.DB_USER;
const dbname = process.env.DB_NAME;

const backupFile = 'backupfile.dump';

const command = `
        psql -h ${hostname} -p ${port} -U ${username} -d ${dbname} -c "ALTER TABLE place DISABLE TRIGGER ALL;"
        pg_restore -h ${hostname} -p ${port} -U ${username} -d ${dbname} -v ${backupFile}
        psql -h ${hostname} -p ${port} -U ${username} -d ${dbname} -c "ALTER TABLE place ENABLE TRIGGER ALL;"
`;


exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur lors de la sauvegarde : ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Erreur : ${stderr}`);
        return;
    }
    console.log(`Restoration réussie : ${stdout}`);
});


