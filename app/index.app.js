import express from 'express';
import cors from 'cors';
import router from './routers/index.router.js';
// import docMiddleware from './middlewares/doc.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// docMiddleware(app);

app.use(router);

export default app;


