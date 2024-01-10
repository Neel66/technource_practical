const express = require("express");
const router = express.Router();

const { BODY, PARAMS } = require("../../constants/request-properties.constant");
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestions,
} = require("../../controllers/question.controller");
const requestValidatorMiddleware = require("../../middlewares/request-validator.middleware");
const { idParam } = require("../../validators/common.validators");
const {
  createQuestionSchema,
  updateQuestionSchema,
} = require("../../validators/question.validators");

router.post(
  "/",
  requestValidatorMiddleware([createQuestionSchema], [BODY]),
  createQuestion
);

router.put(
  "/:id",
  requestValidatorMiddleware([idParam, updateQuestionSchema], [PARAMS, BODY]),
  updateQuestion
);

router.delete(
  "/:id",
  requestValidatorMiddleware([idParam], [PARAMS]),
  deleteQuestion
);

router.get("/", getAllQuestions);

router.get(
  "/:id",
  requestValidatorMiddleware([idParam], [PARAMS]),
  getQuestion
);

module.exports = router;
