import CoreController from './core.controller.js';
import { userDatamapper } from '../../datamappers/index.datamapper.js';

export default class UserApiController extends CoreController {

    static entityName = "user";
    static properDatamapper = userDatamapper;


    static async signUp(req, res) {

        try {
            const { username, email, password, passwordConfirm } = req.body;

            // // Vérifier que tous les champs sont remplis
            // if (!username || !email || !password || !passwordConfirm) {
            //     throw new Error('Champs manquants')
            // }

            // // Verifier que le password correspond au passwordConfirm
            // if (password !== passwordConfirm) {
            //     throw new Error('Mots de passe non correspondants')
            // }

            // Verifier que l'email est unique
            const userFound = await this.properDatamapper.findByEmail(email);
            console.log("on a trouvé le userFound" + userFound);
            if (userFound) {
                throw new Error('Email correspondant trouvé dans la base de données donc connectez-vous');
            }
            console.log("Email non trouvé dans la base de données donc continuez l'inscription");
            // Créer un nouvel utilisateur
            const newUser = await this.properDatamapper.create({
                username: username,
                email: email,
                password : password,
            });
            res.status(200).json(newUser);

        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // async login(req, res) {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await authenticationDatamapper.login(email, password);
    //         if (!user.email == user.req.body){
    //             res.status(404).json({message: 'User not found' });
    //         }
    //          res.status(200).json(user);

    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
}