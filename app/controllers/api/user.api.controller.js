import CoreController from './core.api.controller.js';
import { userDatamapper } from '../../datamappers/index.datamapper.js';
import { userSchema } from '../../schemas/user.get.schema.js';
import encrypt from '../../utils/encrypt.js';
import jwt from 'jsonwebtoken';

export default class UserApiController extends CoreController {
    static entityName = "user";
    static properDatamapper = userDatamapper;

    static async signUp(req, res) {
        try {
            const { error, value } = userSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const { username, email, password } = value;
            const userFound = await this.properDatamapper.findByEmail(email);
            if (userFound) {
                return res.status(400).json({ error: 'E-mail déjà utilisé' });
            }

            console.log("E-mail non trouvé dans la base de données donc continuez l'inscription");

            // Créer un nouvel utilisateur
            const newUser = await this.properDatamapper.create({
                username: username,
                email: email,
                password: encrypt.hashed(password),
            });

            res.status(200).json({
                message: "User registered successfully",
                user: newUser.id,
            });

        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const userFound = await this.properDatamapper.findByEmail(email);
            if (!userFound) {
                return res.status(400).send('Utilisateur non trouvé(mail incorrect)');
            }

            const passwordOk = encrypt.compared(password, userFound.password);

            if (!passwordOk) {
                return res.status(400).send('Utilisateur non trouvé(password incorrect)');
            }

            const token = jwt.sign({ user: userFound }, process.env.JWT_SECRET);
            res.status(200).send({ token });

        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
}

