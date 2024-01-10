const COMMON_MESSAGES = {
  ROUTE_NOT_EXISTS: "Requested route does not exists!",
  VALIDATION_ERROR: "Data validation failed!",
  UNKNOWN_ERROR: "Something went wrong, please try again later!",
  NO_DATA_FOUND: "No data found!",
  DATA_RETRIEVED: "Data retrieved successfully.",
  CREATE_ERROR: "Unable to create a resource.",
  UPDATE_ERROR: "Unable to update a resource.",
  DELETE_ERROR: "Unable to delete a resource.",
  GET_ERROR: "Unable to fetch requested resource.",
  IMAGE_FORMAT_REQUIRED: "Image formate does not valid",
};

const QUESTION_MESSAGE = {
  CREATE: "Question created successfully",
  UPDATE: "Question update successfully",
  GET: "Question get successfully",
  DELETE: "Question delete successfully",
  GET_ALL: "Question get all successfully",
};

module.exports = {
  COMMON_MESSAGES,
  QUESTION_MESSAGE,
};
