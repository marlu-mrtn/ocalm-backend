import Joi from 'joi';

export default Joi.object({
  email: Joi.string().min(2).email({ tlds: { allow: false } }),
  password: Joi.string().min(8),
});
