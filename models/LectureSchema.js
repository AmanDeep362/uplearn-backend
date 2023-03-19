const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  TeacherId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"INSTRUCTORS"
  },
  DueDate: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Board: {
    type: String,
    required: true,
  },
  ChapterName: {
    type: String,
    required: true,
  },
  ChapterNo: {
    type: Number,
    required: true,
  },
  ChapterDescription: {
    type: String,
    required: true,
  },
  iSVarified : {
    type: Boolean,
    required: true,
    default : false,
  },
  isUnderReview : {
    type: Boolean,
    required: true,
    default: false
  },
  StartAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Draft: {
    type: String,
  },
  ChapterContent: [
    {
      LectureContentNo: {
        type: Number,
      },
      LectureTitle: {
        type: String,
      },
      LectureContent: {
        type: String,
      },
    },
  ],
  ChapterVideo: [
    {
      LectureContentNo: {
        type: Number,
      },
      LectureVideoTitle: {
        type: String,
      },
      LectureVideo: {
        type: String,
      },
    },
  ],
  lectureQuiz:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"LECTUREQUIZ"
  }],
});

const Lectures = mongoose.model("LECTURES", LectureSchema);

module.exports = Lectures;
