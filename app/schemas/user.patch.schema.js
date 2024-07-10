import Joi from 'joi';

/**
 * Schéma de validation pour les utilisateurs.
 * @type {Joi.ObjectSchema}
 * @property {Joi.StringSchema} username - Le nom d'utilisateur, doit être une chaîne de caractères avec un minimum de 2 caractères.
 * @property {Joi.StringSchema} email - L'email de l'utilisateur, doit être une chaîne de caractères valide avec un minimum de 2 caractères.
 * @property {Joi.StringSchema} password - Le mot de passe de l'utilisateur, doit être une chaîne de caractères avec un minimum de 8 caractères.
 */
export default Joi.object({
  username: Joi.string().min(2).required(),
  email: Joi.string().min(2).email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
});