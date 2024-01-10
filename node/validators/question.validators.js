const Joi = require("joi");
const { QUESTION_TYPE } = require("../constants/general.constant");

const createQuestionSchema = Joi.object().keys({
  questionName: Joi.string().min(2).max(10000).required(),
  questionType: Joi.string()
    .valid(...Object.values(QUESTION_TYPE))
    .required(),
  isRequired: Joi.boolean().required(),
  questionSequence: Joi.number().required(),
  questionAns: Joi.string().required(),
  questionOptions: Joi.array().optional(),
});

const updateQuestionSchema = Joi.object().keys({
  questionName: Joi.string().min(2).max(10000).optional(),
  questionType: Joi.string()
    .valid(...Object.values(QUESTION_TYPE))
    .optional(),
  isRequired: Joi.boolean().optional(),
  questionSequence: Joi.number().optional(),
  questionAns: Joi.string().optional(),
  questionOptions: Joi.array().optional,
});

module.exports = {
  createQuestionSchema,
  updateQuestionSchema,
};
