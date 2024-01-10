const Joi = require("joi");

const idParam = Joi.object().keys({
  id: Joi.string().length(24).required(),
});

module.exports = {
  idParam,
};
