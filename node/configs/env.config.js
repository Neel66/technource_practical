const dotenv = require("dotenv");
dotenv.config();

const { PORT, DB_URI, JWT_EXPIRES_IN, JWT_SECRET_KEY } = process.env;

module.exports = {
  PORT,
  JWT_SECRET_KEY,
  DB_URI,
  JWT_EXPIRES_IN,
};
