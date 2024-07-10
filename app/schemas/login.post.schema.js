import Joi from 'joi';

/**
 * @type {Joi.ObjectSchema} Schéma d'objet joi
 * @property {Joi.StringSchema} email - L'email de l'utilisateur, doit être une chaîne de caractères avec un minimum de 2 caractères et un format email valide.
 * @property {Joi.StringSchema} password - Le mot de passe de l'utilisateur, doit être une chaîne de caractères avec un minimum de 8 caractères.
 */
export default Joi.object({
  email: Joi.string().min(2).email({ tlds: { allow: false } }),
  password: Joi.string().min(8),
});