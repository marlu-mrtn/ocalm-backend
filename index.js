import { createServer } from 'node:http';
import 'dotenv/config';

import app from './app/index.app.js';

const PORT = process.env.PORT || 5432;
const DBHOST = process.env.DB_HOST || 'localhost';

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://${DBHOST}:${PORT}`)
});
