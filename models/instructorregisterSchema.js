const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const instructorSchema = new mongoose.Schema({
  Teachername: {
    type: String,
    required: true,
  },
  TeacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LECTURES",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  idImage: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isInstructor: {
    type: Boolean,
    default: true,
    required: true,
  },
  teacher_id: {
    type: Number,
    required: true,
  },
  aadharCard: {
    type: Number,
    required: true,
  },
  AadharcardImage: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  classteacher: {
    type: String,
    required: true,
  },
  MyClassrooms:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"LIVECLASSES"
  }],
  CousesList: [
    {
      nameOfCourse: {
        type: String,
      },
      courseId: {
        type: String,
      },
    },
  ],
  followers: [
    {
      studentId: {
        type: String,
      },
    },
  ],
  CousesEnrolled: [
    {
      nameOfCourse: {
        type: String,
      },
      CourseId: {
        type: String,
      },
    },
  ],
  MyLibrary: [
    {
      BookId: {
        type: String,
        unique: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

instructorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bycrypt.hash(this.password, 12);
  }
  next();
});
instructorSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Instructors = mongoose.model("INSTRUCTORS", instructorSchema);
module.exports = Instructors;
