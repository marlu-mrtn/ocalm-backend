import Joi from 'joi';

/**
 * Schéma de validation pour les utilisateurs.
 * @type {Joi.ObjectSchema}
 * @property {Joi.StringSchema} username - Le nom d'utilisateur, doit être une chaîne de caractères avec un minimum de 2 caractères.
 * @property {Joi.StringSchema} email - L'email de l'utilisateur, doit être une chaîne de caractères valide avec un minimum de 2 caractères.
 * @property {Joi.StringSchema} password - Le mot de passe de l'utilisateur, doit être une chaîne de caractères avec un minimum de 8 caractères.
 * @property {Joi.AnySchema} password_confirmation - La confirmation du mot de passe, doit correspondre au champ `password`.
 */
export default Joi.object({
  username: Joi.string().min(2),
  email: Joi.string().min(2).email({ tlds: { allow: false } }),
  password: Joi.string().min(8),
  passwordConfirm: Joi.ref('password'),
});
