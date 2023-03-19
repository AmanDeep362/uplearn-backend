const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const DoubtModel = require("../models/doubtSchema");
const doubtBotAnswer = require("../utils/doubtBot/bot");
router.use(express.json());
dotenv.config();

router.get("/doubts_data", (req, res) => {
  DoubtModel.find({}, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json(data);
    }
  });
});

router.get("/doubt_data_id/:id", (req, res) => {
  const id = req.params.id;
  DoubtModel.findById(id, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/doubt_upvote", (req, res) => {
  const { id, user_id, type } = req.body;
  DoubtModel.findById(id, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error 1" });
    } else {
      if (type === "like") {
        data.Upvotes.push(user_id);
      } else {
        data.Upvotes.splice(data.Upvotes.indexOf(user_id), 1);
      }
      data.save((err, data) => {
        if (err) {
          res.status(500).json({ message: "Internal Server Error 2" });
        } else {
          res.status(200).json(data);
        }
      });
    }
  });
});

router.post("/doubt_answer_upvote", (req, res) => {
  const { id, comment_id, user_id, type } = req.body;
  DoubtModel.findById(id, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error 1" });
    } else {
      data.comments.forEach((comment) => {
        if (comment._id == comment_id) {
          if (type === "like") {
            comment.upvotes.push(user_id);
          } else {
            comment.upvotes.splice(comment.upvotes.indexOf(user_id), 1);
          }
        }
      });
      data.save((err, data) => {
        if (err) {
          res.status(500).json({ message: "Internal Server Error 2" });
        } else {
          res.status(200).json(data);
        }
      });
    }
  });
});

router.post("/addDoubtAnswer", (req, res) => {
  const { id, userId, userName, comment } = req.body;
  DoubtModel.findById(id, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error 1" });
    } else {
      data.comments.push({
        userId,
        userName,
        comment,
      });
      data.save((err, data) => {
        if (err) {
          res.status(500).json({ message: "Internal Server Error 2" });
        } else {
          res.status(200).json(data);
        }
      });
    }
  });
});

router.post("/post_doubt", (req, res) => {
  const { user_id, user_name, title, subject, Description } = req.body;

  const doubtData = new DoubtModel({
    UserId: user_id,
    userName: user_name,
    Title: title,
    Subject: subject,
    Description: Description,
  });

  doubtData
    .save()
    .then(async () => {
      const botComment = await doubtBotAnswer(title);
      console.log(botComment);
      doubtData.comments.push({
        userId: "bot",
        userName: "Alice",
        comment: botComment,
      });
      doubtData.save((err, data) => {
        if (err) {
          res.status(500).json({ message: "Internal Server Error 2" });
        } else {
          res.status(200);
          res.json({ msg: "Doubt Posted Successfully" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ msg: "Failed to Post Doubt" });
    });
});

module.exports = router;
