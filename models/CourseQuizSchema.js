const mongoose = require("mongoose");
const courseQuiz = new mongoose.Schema({
  QuizeName: {
    type: String,
  },
  QuizDifficulty: {
    type: String,
  },
  CourseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "COURSES",
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

const CoursesQuizes = mongoose.model("COURSEQUIZ", courseQuiz);
module.exports = CoursesQuizes;
