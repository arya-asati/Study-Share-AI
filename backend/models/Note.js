const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  filename: {
    type: String,
  },

  summary: {
    type: String,
  },

  vivaQuestions: {
    type: String,
  },

  mcqs: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports =
  mongoose.model("Note", noteSchema);