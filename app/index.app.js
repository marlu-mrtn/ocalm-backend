import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';
import logger from './utils/logger.utils.js';
import docMiddleware from './middlewares/doc.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _, next) => {
    const infos = {
      url: req.url,
      method: req.method,
      agent: req.headers['user-agent'],
    };
    logger.http(req.url, infos);
    next();
  });

docMiddleware(app);

app.use(router);

export default app;


