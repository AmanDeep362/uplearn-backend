const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema({
  ClassName: {
    type: String,
  },
  ClassDescription: {
    type: String,
  },
  meetingId: {
    type: String,
  },
  Class: {
    type: String,
  },
  isUserAllow: {
    type: Boolean,
    default: true,
  },
  Subject: {
    type: String,
  },
  classDatePost: {
    type: Date,
    default: Date.now(),
  },
  classScheduleDate: {
    type: Date,
    default: new Date("2022-08-21T13:08:08.684Z"),
  },
  classScheduleTime: {
    type: String,
  },
  Notes: [
    {
      notesName: {
        type: String,
        required: true,
      },
      NotesPdf: {
        type: String,
        required: true,
      },
    },
  ],
  Notice: [
    {
      NoticeTitle: {
        type: String,
      },
      NoticeDescription: {
        type: String,
      },
    },
  ],
  messages: [
    {
      senderName: {
        type: String,
      },
      senderId: {
        type: String,
      },
      isInstructor: {
        type: Boolean,
        default: true,
      },
      message: {
        type: String,
      },
    },
  ],
  classStatus: {
    type: String,
    default: "Active",
  },
  classOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "INSTRUCTORS",
  },
  classUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
  ],
});

const LIVECLASS = mongoose.model("LIVECLASSES", liveClassSchema);
module.exports = LIVECLASS;
