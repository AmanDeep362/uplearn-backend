const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const LiveClass = require("../models/LiveClassSchema");
const Instructors = require("../models/instructorregisterSchema");
const User = require("../models/userSchema");
const AddtoClassEmail = require("../utils/emails/AddToClassEmail");
const sendmailtomultipleuser = require("../utils/emails/sendmailtomultipleuser");

router.get("/myClassrooms/:Id", (req, res) => {
  const id = req.params.Id;
  LiveClass.find({ classOwner: id })
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

router.get("/myClass/:Id", (req, res) => {
  const id = req.params.Id;
  LiveClass.find({ _id: id })
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

router.post("/addnotesbyinstructor", (req, res) => {
  const { UserId, classId } = req.body;

  LiveClass.findByIdAndUpdate(
    classId,
    notesName,
    NotesPdf,
    {
      $push: {
        Notes: { notesName: notesName, NotesPdf: NotesPdf },
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ msg: "course added Successful" });
      }
    }
  );
});

router.post("/ScheduleClass", async (req, res) => {
  const { classId, Scheduledate } = req.body;
  const Users = await LiveClass.findById(classId);
  const getClass = await LiveClass.findById(classId);
  const gettimestamp = (day) => {
    let today = new Date(day);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear();
    let hh = today.getHours();
    let mi = today.getMinutes();
    let ss = today.getSeconds();
    let time = dd + "/" + mm + "/" + yy + "(" + hh + ":" + mi + ":" + ss + ")";
    return time;
  };
  const ScheduleTime = gettimestamp(Scheduledate);
  const UserEmails = [];
  Users.classUsers.map(async (item) => {
    const findUser = await User.findById(item);
    UserEmails.push(findUser.email);
    console.log(UserEmails);
  });
  LiveClass.findByIdAndUpdate(
    classId,
    {
      classScheduleDate: Scheduledate,
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        sendmailtomultipleuser(
          UserEmails,
          ScheduleTime,
          getClass.ClassName,
          getClass.ClassDescription,
          getClass.Subject,
          getClass.Class
        );
        res.status(200).json({ msg: "class schedule Successful" });
      }
    }
  );
});

router.post("/Add-Participant", async (req, res) => {
  const { UserId, classId, InstructorId } = req.body;
  const getUser = await User.findById(UserId);
  const getClass = await LiveClass.findById(classId);
  const getInstructor = await Instructors.findById(InstructorId);
  LiveClass.findByIdAndUpdate(classId, {
    $push: {
      classUsers: UserId,
    },
  })
    .then(() => {
      User.findByIdAndUpdate(
        UserId,
        {
          $push: {
            MyClassrooms: classId,
          },
        },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            AddtoClassEmail(
              getUser.name,
              getUser.email,
              getClass.ClassName,
              getClass.ClassDescription,
              getInstructor.Teachername,
              getClass.Subject,
              getClass.Class
            );
            res.status(200).json({ msg: "User added Successful" });
          }
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/sendmessage", async (req, res) => {
  const { classId, message, senderId, senderName } = req.body;
  LiveClass.findById(classId, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      result.messages.push({
        message: message,
        senderId: senderId,
        senderName: senderName,
      });
      result.save((err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

router.post("/sendmessagebystudent", async (req, res) => {
  const { classId, message, senderId, senderName } = req.body;
  LiveClass.findById(classId, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      result.messages.push({
        message: message,
        senderId: senderId,
        senderName: senderName,
        isInstructor: false,
      });
      result.save((err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

router.post("/removefromclass", (req, res) => {
  const { UserId, ClassId } = req.body;
  LiveClass.findByIdAndUpdate(ClassId, {
    $pull: {
      classUsers: UserId,
    },
  })
    .then(() => {
      User.findByIdAndUpdate(
        UserId,
        {
          $pull: {
            MyClassrooms: ClassId,
          },
        },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ msg: "User Removed Successful" });
          }
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

// router.post("/deleteMyClassroom", async (req, res) => {
//   const { classId} = req.body;
//   const InstructorOfClassroms = await LiveClass.findById(classId);
//   LiveClass.findByIdAndDelete(
//     classId
//   ).then(()=>{
//    Instructors.findByIdAndUpdate(
//     InstructorOfClassroms.classOwner,
//     {
//       $pull: {
//           MyClassrooms: classId
//       },
//     },
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.status(200).json({ msg: "User Removed Successful" });
//       }
//     }
//   )
//   }).catch((error)=>{
//     console.log(error);
//   })
// });

router.post("/Create-room", async (req, res) => {
  const {
    classOwner,
    Subject,
    Class,
    ClassName,
    ClassDescription,
    meetingId,
    classDatePost,
  } = req.body;
  if (
    !classOwner ||
    !Subject ||
    !Class ||
    !ClassName ||
    !ClassDescription ||
    !meetingId ||
    !classDatePost
  ) {
    res.json({ msg: "filled are required to fill" });
  } else {
    const newLiveClass = new LiveClass({
      classOwner,
      Subject,
      Class,
      ClassName,
      ClassDescription,
      meetingId,
      classDatePost,
    });
    await newLiveClass.save();
    const InstructorClassroms = await Instructors.findById(classOwner);
    await InstructorClassroms.MyClassrooms.push(newLiveClass);
    await InstructorClassroms.save();
    res.sendStatus(200);
  }
});

module.exports = router;
