import Joi from 'joi';

export default Joi.object({
  name: Joi.string().min(2),
  gps_location: Joi.number(),
  image: Joi.string(),
  journey: Joi.string(),
  description: Joi.string(),
});
