import CoreController from './core.api.controller.js';
import { userDatamapper } from '../../datamappers/index.datamapper.js';
import encrypt from '../../utils/encrypt.utils.js';
import jwt from 'jsonwebtoken';
// import authMiddleware from '../../middlewares/jwt.middleware.js';

export default class UserApiController extends CoreController {

    static entityName = "user";
    static properDatamapper = userDatamapper;


    static async signUp(req, res) {

        const { username, email, password, passwordConfirm } = req.body;

        // Vérifier que tous les champs sont remplis
        if (!username || !email || !password || !passwordConfirm) {
            throw new Error('Champs manquants')
        }

        // Verifier que le password correspond au passwordConfirm
        if (password !== passwordConfirm) {
            throw new Error('Mots de passe non correspondants')
        }

        // Vérifier que l'email correspond
        const userFound = await this.properDatamapper.findByEmail(email);

        if (userFound) {
            throw new Error('E-mail correspondant trouvé dans la base de données donc connectez-vous');
        }

        // Créer un nouvel utilisateur
        const newUser = await this.properDatamapper.create({
            username: username,
            email: email,
            password : encrypt.hashed(password),
        });


        res.status(200).json({
            message: "User registered successfully",
            newUser: newUser[0].id,
        });

    };

    static async login(req, res) {

        const { email, password } = req.body;
        const userFound = await this.properDatamapper.findByEmail(email);
        if (!userFound) {
            return res.status(400).send('Utilisateur non trouvé(mail incorrect)');
        }

        const passwordOk = encrypt.compared(password, userFound.password);


        if (!passwordOk){
            return res.status(400).send('Utilisateur non trouvé(password incorrect)');
        }
        // const token = await authMiddleware.generateToken(userFound, true);
        const token = jwt.sign({ userFound: userFound.id }, process.env.JWT_SECRET);
        res.status(200).send({ token });
    };

};
