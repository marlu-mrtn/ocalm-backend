import Joi from 'joi';

export default Joi.object({
  username: Joi.string().min(2),
  email: Joi.string().min(2).email({ tlds: { allow: false } }),
  password: Joi.string().min(8),
  password_confirmation: Joi.ref('password'),
});
