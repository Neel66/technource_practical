const express = require("express");
const { PORT } = require("./configs/env.config");
const { createServer } = require("http");
const cors = require("cors");
const apiHelper = require("./helpers/api.helper");
const { COMMON_MESSAGES } = require("./constants/messages.constant");
const { NOT_FOUND } = require("./constants/http-status-code.constant");
const {
  PUBLIC_DIR,
  PROFILE_IMAGES,
} = require("./constants/file-directories.constant");
const path = require("path");

// database connection
require("./configs/db-connection.config");

const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/questionImage",
  express.static(path.join(__dirname, `${PUBLIC_DIR}/${PROFILE_IMAGES}`))
);
app.use(require("./routes/index.route"));

// catch 404 route and pass it to error handler
app.use((req, res, next) => {
  const error = new Error(COMMON_MESSAGES.ROUTE_NOT_EXISTS);
  error.status = NOT_FOUND;
  next(error);
});

// error handlers
app.use((err, req, res, next) => {
  console.log("err :>> ", err);
  apiHelper.failure(res, err.message, [], NOT_FOUND);
});

httpServer.listen(PORT || 5000, () => {
  console.log(`Server is up and running at ${PORT || 5000}`);
});
