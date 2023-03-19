const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Courses = require("../models/coursesSchema");
const CoursesQuizes = require("../models/CourseQuizSchema");
const Instructors = require("../models/instructorregisterSchema");
const User = require("../models/userSchema");
const QuizSolved = require("../models/QuiZSolved");


router.post("/Instructoraddcourse", (req, res) => {
  const {
    title,
    courseojective,
    level,
    language,
    Description,
    thumbnail,
    courseInstructor,
    courseCategory,
  } = req.body;

  if (
    !title ||
    !courseojective ||
    !level ||
    !language ||
    !Description ||
    !thumbnail ||
    !courseCategory ||
    !courseInstructor
  ) {
    return res.sendStatus(201);
  }

  const courses = new Courses({
    title,
    courseojective,
    level,
    language,
    Description,
    thumbnail,
    courseInstructor,
    courseCategory,
  });
  courses
    .save()
    .then(async () => {
      Instructors.findByIdAndUpdate(
        courseInstructor,
        {
          $push: {
            CousesList: { nameOfCourse: courses.title, courseId: courses._id },
          },
        },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
      res.status(200).json({ msg: "course added Successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ msg: "Failed to Register" });
    });
});

router.get("/CoursesUplearn", (req, res) => {
  Courses.find({}).then((result) => {
    res.send(result);
  });
});

router.get("/coursesUplearn/:id", (req, res) => {
  const id = req.params.id;
  Courses.find({ courseInstructor: id })
    .then((product) => {
      if (product) {
        return res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.get("/Instructorcourse/:id", (req, res) => {
  const id = req.params.id;

  Courses.find({ _id: id })
    .populate("courseQuiz")
    .then((product) => {
      if (product) {
        return res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.get("/getQuiz", (req, res) => {
  CoursesQuizes.find({})
    .then((product) => {
      if (product) {
        // console.log(product)
        res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addVideoToCourse", (req, res) => {
  const { VideoLecture, VideoContentTitle, Id } = req.body;
  console.log(req.body);
  Courses.findByIdAndUpdate(
    Id,
    {
      $push: {
        courseVideoContent: {
          VideoLecture: VideoLecture,
          VideoContentTitle: VideoContentTitle,
        },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

router.post("/addArticleToCourse", (req, res) => {
  const { ArticleTitle, ArticleContent, Id } = req.body;
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yy = today.getFullYear();
  let hh = today.getHours();
  let mi = today.getMinutes();
  let ss = today.getSeconds();
  let time = dd + "/" + mm + "/" + yy + "(" + hh + ":" + mi + ":" + ss + ")";
  Courses.findByIdAndUpdate(
    Id,
    {
      $push: {
        courseArticles: {
          ArticleTitle: ArticleTitle,
          ArticleContent: ArticleContent,
          time: time,
        },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

router.post("/EnrolledCourse", (req, res) => {
  const { userId, CourseId, nameOfCourse } = req.body;

  User.findByIdAndUpdate(
    userId,
    {
      $push: {
        CousesEnrolled: { nameOfCourse: nameOfCourse, CourseId: CourseId },
      },
    }
  ).then(async ()=>{
    let mycourse =await Courses.findById(CourseId);
    Courses.findByIdAndUpdate(CourseId,{
      TotalEnrolled:mycourse.TotalEnrolled+1
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    })
  }).catch((err)=>{
    console.log(err);
  })
});
router.post("/EnrolledCourseTeacher", (req, res) => {
  const { userId, CourseId, nameOfCourse } = req.body;

  Instructors.findByIdAndUpdate(
    userId,
    {
      $push: {
        CousesEnrolled: { nameOfCourse: nameOfCourse, CourseId: CourseId },
      },
    }
  ).then(async ()=>{
    let mycourse =await Courses.findById(CourseId);
    Courses.findByIdAndUpdate(CourseId,{
      TotalEnrolled:mycourse.TotalEnrolled+1
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    })
  }).catch((err)=>{
    console.log(err);
  })
});

router.post("/EnrolledCourseTeacher", (req, res) => {
  const { userId, CourseId, nameOfCourse } = req.body;

  Instructors.findByIdAndUpdate(
    userId,
    {
      $push: {
        CousesEnrolled: { nameOfCourse: nameOfCourse, CourseId: CourseId },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

router.post("/createQuiz", async (req, res) => {
  const { CourseId, QuizeName, QuizDifficulty, marksPerQuestion } = req.body;
  const QUIZ = await new CoursesQuizes({
    QuizeName: QuizeName,
    QuizDifficulty: QuizDifficulty,
    marksPerQuestion: marksPerQuestion,
  });
  await QUIZ.save();
  const CO = await Courses.findById(CourseId);
  await CO.courseQuiz.push(QUIZ);
  await CO.save();
  res.sendStatus(200);
});

router.post("/addQuestionToQuiz", async (req, res) => {
  const { question, options, correctOption, quizId, MarksPerquestion } =
    req.body;

  CoursesQuizes.findByIdAndUpdate(quizId, {
    $push: {
      QuestionsofQuiz: {
        question: question,
        options: options,
        correctOption: correctOption,
        MarksPerquestion: MarksPerquestion,
      },
    },
  })
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/CourseRating", (req, res) => {
  const { courseId, UserId, rating, review } = req.body;
  Courses.findByIdAndUpdate(
    courseId,
    { $push: { Rating: { rateBy: UserId, rating: rating, review: review } } },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

/// Edit Course Task
router.post("/deltemycourseVideos", (req, res) => {
  const { id, courseid } = req.body;
  Courses.findByIdAndUpdate(
    courseid,
    {
      $pull: {
        courseVideoContent: { _id: id },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "Video Removed Successful" });
      }
    }
  );
});

router.post("/EditMyCourseArticledetails", (req, res) => {
  const { id, course, Title, LectureContent } = req.body;
  Courses.updateOne(
    { _id: course, "courseArticles._id": id },
    {
      $set: {
        "courseArticles.$.ArticleTitle": Title,
        "courseArticles.$.ArticleContent": LectureContent,
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "Course Update Successful" });
      }
    }
  );
});

router.post("/delteMyCourseQuiz", (req, res) => {
  const { id, courseid } = req.body;

  Courses.findByIdAndUpdate(courseid, {
    $pull: {
      courseQuiz: id,
    },
  }).then(() => {
    CoursesQuizes.findByIdAndDelete(id, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "Quiz Removed Successful" });
      }
    });
  });
});

router.post("/addQuizReport", async (req, res) => {
  const { marksObtain, totalMarks, quesId, userId } = req.body;
  const QUIZREPORT = await new QuizSolved({
    marksObtain: marksObtain,
    totalMarks: totalMarks,
    quesId: quesId,
    userId: userId
  });
  await QUIZREPORT.save();
  const CO = await User.findById(userId);
  await CO.CousesEnrolled.push(QUIZREPORT);
  await CO.save();
  res.sendStatus(200);
  console.log("successful");
});

router.get("/getQuizReport", (req, res) => {
  QuizSolved.find({})
    .then((product) => {
      if (product) {
        // console.log(product)
        res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
    });
})


module.exports = router;
