import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';
import logger from './utils/logger.utils.js';
import docMiddleware from './middlewares/doc.middleware.js';

const app = express();

//app.use(cors());
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.options('*', (req, res) => {
//  res.set({
//    'Access-Control-Allow-Origin': '*',  // Ou votre domaine spécifique
//    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
//    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//    'Access-Control-Max-Age': '1728000',
//    'Content-Type': 'text/plain; charset=utf-8',
//    'Content-Length': '0'
//  });
//  res.sendStatus(204);  // Réponse sans contenu (204 No Content)
//});
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


