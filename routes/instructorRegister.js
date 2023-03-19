const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Instructors = require("../models/instructorregisterSchema");
const sendInstructorRegistrationEmail = require("../utils/emails/sendInstructorRegisterEmail");

router.post("/InstructorRegister", (req, res) => {
    const {
        Teachername,
        email,
        subject,
        block,
        permanentAddress,
        school,
        city,
        state,
        pincode,
        mobileno,
        idImage,
        image,
        isInstructor,
        teacher_id,
        aadharCard,
        AadharcardImage,
        degree,
        classteacher,
    } = req.body;

    console.log(req.body);

    function generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    const password = generatePassword();
    if (!Teachername || !email) {
        return res.sendStatus(201);
    }

    Instructors.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(422);
            }
            const instructors = new Instructors({
                Teachername,
                email,
                password,
                subject,
                block,
                permanentAddress,
                school,
                city,
                state,
                pincode,
                mobileno,
                idImage,
                image,
                isInstructor,
                teacher_id,
                aadharCard,
                AadharcardImage,
                degree,
                classteacher,
            });
            instructors
                .save()
                .then(() => {
                    sendInstructorRegistrationEmail(email, Teachername, instructors._id, image, password, subject).then(() => {
                        res
                            .status(200)
                            .json({ msg: "Instructor Registration Registration Successful" });
                    }).catch((err) => {
                        console.log(err);
                    })

                })
                .catch((err) => {
                    console.log(err);
                    res.status(501).json({ msg: "Failed to Register" });
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/allInstructor', (req, res) => {
    Instructors.find({}).then((result) => {
        res.send(result)
    });
})

router.post("/InstructorRemoved", (req, res) => {
    const { id } = req.body;
    Instructors.findByIdAndDelete(id, function(err, docs) {
        if (err) {
            console.log("Error occured" + err)
        } else {
            res.status(200).json({ msg: "deleted" })
            console.log("Deleted : " + docs);
        }
    })
})

//Change The Password
router.post("/setnewinstructorpassword", (req, res) => {
    const { _id, npassword, cpassword } = req.body;

    Instructors.findOne({ _id: _id })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "User don't exists" })
            }
            user.password = npassword
            user.cpassword = cpassword
            user.save().then(() => {
                res.json({ message: "password updated success" })
            })
        }).catch(err => {
            console.log(err)
        })
})

// Finding one instructor by its id
router.get('/instructordetails/:id', (req, res) => {
    const id = req.params.id;

    Instructors.findOne({ _id: id }).then((product) => {
        if (product) {
            return res.send(product)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(404)
    })

})

module.exports = router;