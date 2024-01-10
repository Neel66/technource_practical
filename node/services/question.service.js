const Question = require("../models/questions.model");
const { COMMON_MESSAGES } = require("../constants/messages.constant");

const create = async (body) => {
  try {
    return await Question.create(body);
  } catch (error) {
    console.log("error", error);
    throw Error(COMMON_MESSAGES.CREATE_ERROR);
  }
};

const update = async (query, body) => {
  try {
    return await Question.findOneAndUpdate(query, body, { new: true });
  } catch (error) {
    throw Error(COMMON_MESSAGES.UPDATE_ERROR);
  }
};

const remove = async (query) => {
  try {
    return await Question.findByIdAndRemove(query);
  } catch (error) {
    throw Error(COMMON_MESSAGES.UPDATE_ERROR);
  }
};

const get = async (query) => {
  try {
    return await Question.findOne(query);
  } catch (error) {
    throw Error(COMMON_MESSAGES.GET_ERROR);
  }
};

const getAll = async (query = {}) => {
  try {
    return await Question.find(query).sort({ questionSequence: 1 });
  } catch (error) {
    throw Error(COMMON_MESSAGES.GET_ERROR);
  }
};

module.exports = {
  create,
  update,
  remove,
  get,
  getAll,
};
