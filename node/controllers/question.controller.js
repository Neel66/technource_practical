const { BAD_REQUEST } = require("../constants/http-status-code.constant");
const {
  COMMON_MESSAGES,
  QUESTION_MESSAGE,
} = require("../constants/messages.constant");
const apiHelper = require("../helpers/api.helper");
const questionService = require("../services/question.service");

const createQuestion = async (req, res) => {
  try {
    const { body } = req;

    const question = await questionService.create(body);

    if (question) {
      return apiHelper.success(res, QUESTION_MESSAGE.CREATE, {
        question,
      });
    }
    return apiHelper.failure(
      res,
      COMMON_MESSAGES.CREATE_ERROR,
      [],
      BAD_REQUEST
    );
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { body, params } = req;

    const { id: _id } = params;

    const question = await questionService.update({ _id }, body);

    if (question) {
      return apiHelper.success(res, QUESTION_MESSAGE.UPDATE, {
        question,
      });
    }
    return apiHelper.failure(
      res,
      COMMON_MESSAGES.UPDATE_ERROR,
      [],
      BAD_REQUEST
    );
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const question = await questionService.remove({
      _id,
    });
    if (question) {
      return apiHelper.success(res, QUESTION_MESSAGE.DELETE, {
        question,
      });
    }
    return apiHelper.failure(
      res,
      COMMON_MESSAGES.DELETE_ERROR,
      [],
      BAD_REQUEST
    );
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

const getQuestion = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const question = await questionService.get({
      _id,
    });
    if (question && Object.keys(question).length) {
      return apiHelper.success(res, QUESTION_MESSAGE.GET, {
        question,
      });
    }
    return apiHelper.success(res, COMMON_MESSAGES.GET_ERROR, { question: {} });
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAll();
    if (questions && questions.length) {
      return apiHelper.success(res, QUESTION_MESSAGE.GET_ALL, { questions });
    }
    return apiHelper.success(res, COMMON_MESSAGES.NO_DATA_FOUND, {
      questions: [],
    });
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestions,
};
