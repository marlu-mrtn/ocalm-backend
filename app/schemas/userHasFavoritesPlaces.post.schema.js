import Joi from 'joi';

/**
 * Schéma de validation pour les favs.
 * @type {Joi.ObjectSchema}
 * @property {Joi.NumberSchema} place_id - L'identifiant de la place associé à la fav, doit être un nombre.
 * @property {Joi.NumberSchema} user_id - L'identifiant de l'utilisateur associé à la fav, doit être un nombre.

 */
export default Joi.object({

    place_id: Joi.number(),
    user_id: Joi.number(),

});
