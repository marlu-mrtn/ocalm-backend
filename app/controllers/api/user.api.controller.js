import CoreController from './core.api.controller.js';
import { userDatamapper } from '../../datamappers/index.datamapper.js';
import { userSchema } from '../../schemas/user.get.schema.js';

/**
 * Controlleur pour la table user
 * Répertorie les méthodes de la table user comme l'enregistrement et le l'authentification
 */
export default class UserApiController extends CoreController {

    /**
     * Nom de l'entité à utiliser.
     * @type {string}
     */
    static entityName = "user";

    /**
     * Le datamapper associé.
     * @type {Object}
     */
    static properDatamapper = userDatamapper;

    /**
     * Inscription d'un nouvel utilisateur.
     * @param {Request} req - La route demandée
     * @param {Response} res - reponse attendue en fonction de la route
     * @returns {Promise<void>}
     */
    static async signUp(req, res) {
        try {
            const {error,value} = userSchema.validate(req.body);

            if(error){
                return res.status(400).json({error :error.details[0].message});
            }
            const {username, email, password}= value;
            const userFound = await this.properDatamapper.findByEmail(email);
            if(userFound){
                return res.status(400).json({error: 'E-mail déjà utilisé'});
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
    /**
     * Connexion d'un utilisateur.
     * @param {Request} req - La route demandée
     * @param {Response} res - reponse attendue en fonction de la route
     * @returns {Promise<void>}
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const userFound = await this.properDatamapper.findByEmail(email);
            if (!userFound) {
                return res.status(400).send('Utilisateur non trouvé(mail incorrect)');
            }

            if (userFound.password !== password){
                return res.status(400).send('Utilisateur non trouvé(password incorrect)');
            }
            return res.status(200).send('Utilisateur trouvé(mail and password)');



        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}
