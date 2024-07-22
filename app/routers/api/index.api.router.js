import express from 'express';
import registerRouter from './register.api.router.js';
import userRouter from './user.api.router.js';
import placeRouter from './place.api.router.js';
import tagRouter from './tag.api.router.js';
import loginRouter from './login.api.router.js'

const router = express.Router();
// Ce middleware sert à définir le format par défaut des réponses, ici du json.
router.use((_, res, next) => {
    res.returnFormat = 'json';
    next();
});
/**
 * Routeur pour les utilisateurs.
 * @name /user
 * @function
 * @memberof module:routers - ce routeur découle du router principal
 */
router.use('/user', userRouter);

/**
 * Routeur pour l'inscription.
 * @name /register
 * @function
 * @memberof module:routers - ce routeur découle du router principal
 */
router.use('/register', registerRouter);

/**
 * Routeur pour les lieux.
 * @name /places
 * @function
 * @memberof module:routers - ce routeur découle du router principal
 */
router.use('/places', placeRouter);

/**
 * Routeur pour les tags.
 * @name /tags
 * @function
 * @memberof module:routers - ce routeur découle du router principal
 */
router.use('/tags', tagRouter);

/**
 * Routeur pour les connexions.
 * @name /places
 * @function
 * @memberof module:routers - ce routeur découle du router principal
 */
router.use('/login', loginRouter);

export default router;
