const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
router.use(express.json());
dotenv.config();
const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const sendRegistrationEmail = require("../utils/emails/sendRegistrationEmail");

router.post("/register", (req, res) => {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
        return res.sendStatus(201);
    }

    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(422);
            }
            const user = new User({ name, email, password, cpassword });
            user.save().then(() => {
                res.status(200).json({ msg: "Registration Successful" });
                sendRegistrationEmail(email, name);
            }).catch((err) => {
                res.status(501).json({ msg: "Failed to Register" })
            })
        }).catch((err) => {
            console.log(err)
        })
})


router.post("/adminregister", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.sendStatus(201);
    }

    Admin.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(422);
            }
            const user = new Admin({ name, email, password });

            user.save().then(() => {
                Volunteers.findByIdAndUpdate("")
                res.status(200).json({ msg: "Registration Successful" });
            }).catch((err) => {
                res.status(501).json({ msg: "Failed to Register" })
            })
        }).catch((err) => {
            console.log(err)
        })
})


//Change The Password
router.post("/setnewstudentpassword", (req, res) => {
    const { _id, npassword, cpassword } = req.body;

    User.findOne({ _id: _id })
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

router.get('/allStudents', (req, res) => {
    User.find({}).then((result) => {
        res.send(result)
    });
})

router.post("/StudentRemoved", (req, res) => {
    const { id } = req.body;
    User.findByIdAndDelete(id, function(err, docs) {
        if (err) {
            console.log("Error occured" + err)
        } else {
            res.status(200).json({ msg: "deleted" })
            console.log("Deleted : " + docs);
        }
    })
})

module.exports = router;