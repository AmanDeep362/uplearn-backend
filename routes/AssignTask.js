const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Lectures = require("../models/LectureSchema");
const LectureQuiz = require("../models/LectureQuizSchema");
const sendVerifyTaskmsg = require("../utils/emails/VerifyInstructorTask");
const sendRejectTaskmsg = require("../utils/emails/RejectInstructorTask");

router.post("/AssignTaskToInstructor", (req, res) => {
  const {
    TeacherId,
    Subject,
    Class,
    DueDate,
    Board,
    ChapterName,
    ChapterNo,
    ChapterDescription,
  } = req.body;

  // console.log(req.body);

  const lectures = new Lectures({
    TeacherId,
    Subject,
    Class,
    DueDate,
    Board,
    ChapterName,
    ChapterNo,
    ChapterDescription,
  });
  lectures
    .save()
    .then(() => {
      res.status(200);
      res.json({ msg: "Instructor Registration Registration Successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ msg: "Failed to Register" });
    });
});

router.get("/assigntaskdetails/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  if (!id) {
    res.sendStatus(422);
  }
  Lectures.find({ TeacherId: id, iSVarified: false })
    .then((product) => {
      if (product) {
        // console.log(product)
        return res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.get("/singleassigntaskinfo/:id", (req, res) => {
  const id = req.params.id;
  Lectures.find({ _id: id })
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

router.post("/Instructoraddlecturedetails/:id", (req, res) => {
  const id = req.params.id;
  const { LectureNo, Title, LectureContent } = req.body;

  // console.log(id, LectureContentNo, LectureTitle, LectureContent)

  if (!LectureNo || !Title || !LectureContent) {
    return res.sendStatus(201);
  }

  Lectures.findByIdAndUpdate(
    id,
    {
      Draft: "",
      $push: {
        ChapterContent: {
          LectureContentNo: LectureNo,
          LectureTitle: Title,
          LectureContent: LectureContent,
        },
      },
    },
    function (err, docs) {
      if (err) {
        console.log("Error occured" + err);
      } else {
        res.status(200).json({ msg: "Content Added" });
        // console.log(docs);
      }
    }
  );
});

router.post("/Instructoraddlecturevideo/:id", (req, res) => {
  const id = req.params.id;
  const { LectureNo, Title, VideoLecture } = req.body;

  // console.log(id, LectureContentNo, LectureTitle, LectureContent)

  if (!LectureNo || !Title || !VideoLecture) {
    return res.sendStatus(201);
  }

  Lectures.findByIdAndUpdate(
    id,
    {
      $push: {
        ChapterVideo: {
          LectureContentNo: LectureNo,
          LectureVideoTitle: Title,
          LectureVideo: VideoLecture,
        },
      },
    },
    function (err, docs) {
      if (err) {
        console.log("Error occured" + err);
      } else {
        res.status(200).json({ msg: "Content Added" });
        // console.log(docs);
      }
    }
  );
});

router.post("/saveassigntaskasdeaft", (req, res) => {
  const { id, content } = req.body;

  if (!id) {
    return res.sendStatus(201);
  }

  Lectures.findByIdAndUpdate(id, { Draft: content }, function (err, docs) {
    if (err) {
      console.log("Error occured" + err);
    } else {
      res.status(200).json({ msg: "Content Added" });
      // console.log(docs);
    }
  });
});

router.get("/sendlecturedataforreview/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.sendStatus(201);
  }

  Lectures.findByIdAndUpdate(id, { isUnderReview: true }, function (err, docs) {
    if (err) {
      console.log("Error occured" + err);
    } else {
      res.status(200).json({ msg: "Content goes under review" });
      // console.log(docs);
    }
  });
});

// Routes for add quiz and its question

router.post("/createLectureQuiz", async (req, res) => {
  const { _id, QuizeName, QuizDifficulty } = req.body;

  const QUIZ = await new LectureQuiz({
    QuizeName: QuizeName,
    QuizDifficulty: QuizDifficulty,
  });

  await QUIZ.save();
  const CO = await Lectures.findById(_id);
  await CO.lectureQuiz.push(QUIZ);
  await CO.save();
  res.sendStatus(200);
});

router.post("/addQuestionToLecturesQuiz", async (req, res) => {
  const { question, options, correctOption, quizId, MarksPerquestion } =
    req.body;

  LectureQuiz.findByIdAndUpdate(quizId, {
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

router.get("/lecturedatapop/:id", (req, res) => {
  const id = req.params.id;

  Lectures.find({ _id: id })
    .populate("lectureQuiz")
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

///////////////////////////////////////////////////////////////

router.get("/instructorTaskUnderReview", (req, res) => {
  Lectures.find({ isUnderReview: true })
    .populate("TeacherId")
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

router.get("/instructorTaskDataFetch/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  Lectures.find({ _id: id })
    .populate("lectureQuiz")
    .populate("TeacherId")
    .then((product) => {
      if (product) {
        // console.log(product)
        return res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

// Fetching Task For specific class, board, subject and is verified
router.post("/instructorTaskDataFetchForBoardClassSub", (req, res) => {
  const { board, classe, subject } = req.body;
  Lectures.find({
    Board: board,
    Class: classe,
    Subject: subject,
    iSVarified: true,
  })
    .then((product) => {
      if (product) {
        // console.log(product)
        return res.send(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.post("/verifyinstructorttask", (req, res) => {
  const { id, name, email } = req.body;
  // console.log(id);

  if (!id) {
    return res.sendStatus(201);
  }

  Lectures.findByIdAndUpdate(
    id,
    { isUnderReview: false, iSVarified: true },
    function (err, docs) {
      if (err) {
        console.log("Error occured" + err);
      } else {
        sendVerifyTaskmsg(email, name);
        res.status(200).json({ msg: "Content Verified" });
        // console.log(docs);
      }
    }
  );
});

router.post("/rejectedinstructorttask", (req, res) => {
  const { id, name, email, duedate, message } = req.body;
  // console.log(id);

  if (!id) {
    return res.sendStatus(201);
  }

  Lectures.findByIdAndUpdate(
    id,
    { isUnderReview: false, DueDate: duedate },
    function (err, docs) {
      if (err) {
        console.log("Error occured" + err);
      } else {
        sendRejectTaskmsg(email, name, duedate, message);
        res.status(200).json({ msg: "Content Verified" });
      }
    }
  );
});

/// Edit Lecture Task
router.post("/delteAssignTaskVideo", (req, res) => {
  const { id, courseid } = req.body;
  Lectures.findByIdAndUpdate(
    courseid,
    {
      $pull: {
        ChapterVideo: { _id: id },
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

router.post("/Editlecturedetails", (req, res) => {
  const { id, course, Title, LectureContent } = req.body;
  Lectures.updateOne(
    { _id: course, "ChapterContent._id": id },
    {
      $set: {
        "ChapterContent.$.LectureTitle": Title,
        "ChapterContent.$.LectureContent": LectureContent,
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "Lecture Update Successful" });
      }
    }
  );
});

router.post("/delteAssignTaskQuiz", (req, res) => {
  const { id, courseid } = req.body;

  Lectures.findByIdAndUpdate(courseid, {
    $pull: {
      lectureQuiz: id,
    },
  }).then(() => {
    LectureQuiz.findByIdAndDelete(id, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "Quiz Removed Successful" });
      }
    });
  });
});

module.exports = router;
