import Joi from 'joi';

/**
 * Schéma de validation pour les places.
 * @type {Joi.ObjectSchema}
 * @property {Joi.StringSchema} name - Le nom de la place, doit être une chaîne de caractères avec un minimum de 2 caractères.
 * @property {Joi.NumberSchema} gps_location_latitude - La position GPS de la place, doit être un nombre.
 * @property {Joi.NumberSchema} gps_location_longitude - La position GPS de la place, doit être un nombre.
 * @property {Joi.StringSchema} image - L'URL de l'image de la place, doit être une chaîne de caractères.
 * @property {Joi.StringSchema} journey - La description du voyage associé à la place, doit être une chaîne de caractères.
 * @property {Joi.StringSchema} description - La description de la place, doit être une chaîne de caractères.
 */
export default Joi.object({
  name: Joi.string().min(2),
  gps_location_latitude: Joi.number().precision(8),
  gps_location_longitude: Joi.number().precision(8),
  picture: Joi.array().items(Joi.string()),
  journey: Joi.array().items(Joi.string()),
  description: Joi.string(),
  user_id: Joi.number(),
});