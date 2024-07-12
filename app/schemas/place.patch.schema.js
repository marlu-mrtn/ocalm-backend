import Joi from 'joi';

/**
 * Schéma de validation pour les places.
 * @type {Joi.ObjectSchema}
 * @property {Joi.StringSchema} name - Le nom de la place, doit être une chaîne de caractères avec un minimum de 2 caractères.
 * @property {Joi.NumberSchema} gps_location - La position GPS de la place, doit être un nombre.
 * @property {Joi.StringSchema} image - L'URL de l'image de la place, doit être une chaîne de caractères.
 * @property {Joi.NumberSchema} user_id - L'identifiant de l'utilisateur associé à la place, doit être un nombre.
 * @property {Joi.StringSchema} journey - La description du voyage associé à la place, doit être une chaîne de caractères.
 * @property {Joi.StringSchema} description - La description de la place, doit être une chaîne de caractères.
 */
export default Joi.object({
  name: Joi.string().min(2),
  gps_location: Joi.number(),
  picture: Joi.array().items(Joi.string()),
  journey: Joi.array().items(Joi.string()),
  description: Joi.string(),
  slug: Joi.string().min(2),
});
