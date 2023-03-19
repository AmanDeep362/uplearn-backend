const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Upvotes: [
    {
      type: String,
    },
  ],
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  comments: [
    {
      userId: {
        type: String,
      },
      userName: {
        type: String,
      },
      comment: {
        type: String,
      },
      upvotes: [
        {
          type: String,
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Doubts = mongoose.model("DOUBTS", DoubtSchema);

module.exports = Doubts;
