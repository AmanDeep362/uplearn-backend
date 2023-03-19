const mongoose = require("mongoose");

const  QuizSolvedSchema = new mongoose.Schema({
  QuizSolvedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LECTUREQUIZ",
  },
 marksObtained:{
 type:Number,
 },
TotalMarks:{
 type:Number,
 }
});

const QuizSolved = mongoose.model("QUIZSOLVED", QuizSolvedSchema);
module.exports = QuizSolved;
