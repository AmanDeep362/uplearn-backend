const mongoose = require("mongoose");

const lectureQuiz = new mongoose.Schema({
  QuizeName: {
    type: String,
  },
  QuizDifficulty: {
    type: String,
  },
  LectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LECTURES",
  },
  QuestionsofQuiz: [
    {
      question: {
        type: String,
      },
      options: {
        type: Array,
      },
      correctOption: {
        type: Number,
      },
      MarksPerquestion: {
        type: Number,
      },
    },
  ],
  solvedby: [
    {
      userId: {
        type: String,
      },
    },
  ],
});

const LectureQuizes = mongoose.model("LECTUREQUIZ", lectureQuiz);
module.exports = LectureQuizes;
