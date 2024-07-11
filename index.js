import { createServer } from 'node:http';
import logger from './app/utils/logger.utils.js';
import 'dotenv/config';

import app from './app/index.app.js';

const PORT = process.env.PORT || 4000;
const DBHOST = process.env.DB_HOST || 'localhost';


const httpServer = createServer(app);

httpServer.listen(PORT, () => {
    logger.info(`Server is running on http://${DBHOST}:${PORT}`)
});



