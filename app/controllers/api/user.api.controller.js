import CoreController from './core.api.controller.js';
import { userDatamapper } from '../../datamappers/index.datamapper.js';
import encrypt from '../../utils/encrypt.utils.js';
import jwt from 'jsonwebtoken';
import ApiError from '../../errors/api.error.js';

export default class UserApiController extends CoreController {

    /**
     * Nom de l'entité.
     * @type {string}
     */
    static entityName = "user";

    /**
     * Datamapper spécifique pour les utilisateurs.
     * @type {Object}
     */
    static properDatamapper = userDatamapper;


    static async signUp(req, res, next) {

        const { username, email, password, passwordConfirm } = req.body;

        if (!username || !email || !password || !passwordConfirm) {
            return next(new ApiError(`Champs manquants`, {status: 400}));

        };

        if (password !== passwordConfirm) {
            return next(new ApiError(`Confirmation de mot de passe incorrecte`, {status: 400}));
        };

        const userFound = await this.properDatamapper.findByEmail(email);

        if (userFound) {
            return next(new ApiError(`Email existant, connectez-vous`, {status: 400}));
        };

        const newUser = await this.properDatamapper.create({
            username: username,
            email: email,
            password : encrypt.hashed(password),
        });

        res.status(200).json({
            message: "Utilisateur bien enregistré",
            newUser: newUser[0].id,
        });

    };

    static async login(req, res, next) {

        const { email, password } = req.body;
        const userFound = await this.properDatamapper.findByEmail(email);
        if (!userFound) {
            return next(new ApiError(`Email incorrect`, {status: 400}));
        }

        const passwordOk = encrypt.compared(password, userFound.password);

        if (!passwordOk){
            return next(new ApiError(`Password incorrect`, {status: 400}));
        }

        const token = jwt.sign({ userFound: userFound.id }, process.env.JWT_SECRET);

        res.status(200).send({ token });
    };

};
