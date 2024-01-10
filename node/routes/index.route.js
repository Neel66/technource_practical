const express = require("express");
const router = express.Router();

router.use("/question", require("./api/question.route"));

module.exports = router;
