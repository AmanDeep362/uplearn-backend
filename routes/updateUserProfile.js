const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bycrypt = require('bcrypt')
router.use(express.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());
const User = require("../models/userSchema");
const Instructor = require("../models/instructorregisterSchema");


router.post("/updateUserProfile", (req, res) => {
    const {
        _id,
        firstName,
        LastName,
        classes,
        Board,
        PermanentAddress,
        School,
        City,
        State,
        Pincode,
        mobileno,
        Gender,
        DOB,
        BIO
    } = req.body;


    User.findByIdAndUpdate(_id, {
            name: firstName + ' ' + LastName,
            firstName: firstName,
            LastName: LastName,
            classes: classes,
            Board: Board,
            PermanentAddress: PermanentAddress,
            School: School,
            City: City,
            State: State,
            Pincode: Pincode,
            mobileno: mobileno,
            Gender: Gender,
            DOB: DOB,
            BIO: BIO
        },
        function(err, docs) {
            if (err) {
                console.log("error occured" + err)
            } else {
                res.status(200).json({ msg: "Updated" })
                console.log("Updated Profile : " + docs);
            }
        })
})
router.post("/updateImg", (req, res) => {
    const {
        Image,
        _id
    } = req.body;

    console.log(Image, _id);

    User.findByIdAndUpdate(_id, {
            Image: Image
        },
        function(err, docs) {
            if (err) {
                console.log("error occured" + err)
            } else {
                res.status(200).json({ msg: "Updated" })
                console.log("Updated Profile Image Successful");
            }
        })
})

module.exports = router;