const mongoose = require("mongoose");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    cpassword: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    classes: {
        type: Number,
    },
    Board: {
        type: String,
    },
    PermanentAddress: {
        type: String,
    },
    School: {
        type: String,
    },
    City: {
        type: String,
    },
    State: {
        type: String,
    },
    Pincode: {
        type: Number,
    },
    mobileno: {
        type: Number,
    },
    Image: {
        type: String,
        default : "https://res.cloudinary.com/uplearn/image/upload/v1658991315/h8k4dbiyonx5j8jv7m0h.png"
    },
    isInstructor: {
        type: Boolean,
    },
    progress: {
        type: Number,
    },
    Gender: {
        type: String,
    },
    DOB: {
        type: String,
    },
    BIO: {
        type: String,
    },
    certificates: [{
        nameofcertificate: {
            type: String,
        },
        issuedby: {
            type: String,
        },
        certificateimage: {
            type: String,
        }
    }],
    MyLibrary: [{
        BookId: {
            type: String,
            unique:true,
        }
    }],
    MyClassrooms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LIVECLASSES"
      }],
    CousesEnrolled: [{
        nameOfCourse: {
            type: String,
        },
        CourseId: {
            type: String,
        },
        quizSolved :[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"QUIZSOLVED"
        }]
    }],
    following: [{
        instructorId: {
            type: String,
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
        this.cpassword = await bycrypt.hash(this.cpassword, 12);
    }
    next();
})
userSchema.methods
    .generateAuthToken = async function() {
        try {
            let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({ token: token })
            await this.save()
            return token;
        } catch (err) {
            console.log(err);
        }
    }

const User = mongoose.model("USER", userSchema)
module.exports = User;