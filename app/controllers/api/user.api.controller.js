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

            // Vérifier que l'email correspond
            const userFound = await this.properDatamapper.findByEmail(email);
            console.log(`this is : ${userFound}`);

            if (userFound) {
                throw new Error('E-mail correspondant trouvé dans la base de données donc connectez-vous');
            }

            console.log("E-mail non trouvé dans la base de données donc continuez l'inscription");

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

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const userFound = await this.properDatamapper.findByEmail(email);
            
            if (!userFound) {
                res.status(400).send('Utilisateur non trouvé(mail incorrect)');
            }

            if (userFound.password !== req.body.password){
                res.status(400).send('Utilisateur non trouvé(password incorrect)');
            }
             res.status(200).send('Utilisateur trouvé(mail and password)');

             

        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}
