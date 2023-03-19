const mongoose = require("mongoose");
const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  courseojective:{
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  courseCategory :{
    type: String,
    required: true,
  },
  courseInstructor: {
    type: String,
    required: true,
  },
  TotalEnrolled :{
    type:Number,
    default:0,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  courseVideoContent :[{
    VideoContentTitle: {
      type: String,
    },
    VideoLecture: {
      type: String,
    },
  }],
  courseArticles: [
    {
      
      ArticleTitle: {
        type: String,
      },
      ArticleContent: {
        type: String,
      },
      time:{
        type:String
      },
      upVotes:{
        typr:Number,
        default : 0
      },
      downVotes:{
        typr:Number,
        default : 0
      }
    },
  ],
  courseQuiz:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"COURSEQUIZ"
  }],
  Rating :[{
    rateBy :{
      type: String,
    },
    review :{
      type: String,
    },
    rating :{
      type: Number,
    },
    
  }],
  specialization: {
    type: String,
  },
  // courseRating: [
  //   {
  //     Positive: {
  //       type: Numbers,
  //     },
  //     Negative: {
  //       type: Numbers,
  //     },
  //   },
  // ],
});

const Courses = mongoose.model("COURSES", coursesSchema);
module.exports = Courses;
