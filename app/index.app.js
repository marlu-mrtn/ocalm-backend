import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';
import logger from './utils/logger.utils.js';
import docMiddleware from './middlewares/doc.middleware.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*', // Remplacez par vos domaines spécifiques en production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);

app.options('*', cors(corsOptions));

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


