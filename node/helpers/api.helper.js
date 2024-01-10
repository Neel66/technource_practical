const {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
} = require("../constants/http-status-code.constant");

const success = (res, message = "", data = {}, errors = [], success = true) => {
  return res.status(SUCCESS).json({
    success,
    message,
    data,
    errors,
  });
};

const failure = (
  res,
  message = "",
  errors = [],
  statusCode = INTERNAL_SERVER_ERROR,
  data = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data,
    errors,
  });
};

module.exports = {
  success,
  failure,
};
