const mongoose = require("mongoose");
const { QUESTION } = require("../configs/models.configs");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    questionName: {
      type: String,
      required: true,
      max: 10000,
    },
    questionType: {
      type: String,
      required: false,
    },
    isRequired: {
      type: Boolean,
      required: true,
    },
    questionSequence: { type: Number, required: true, index: true },
    questionAns: { type: String, required: true },
    questionOptions: { type: Array, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.id;
      },
    },
  }
);

module.exports = mongoose.model(QUESTION, questionSchema);
