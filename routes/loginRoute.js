const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bycrypt = require('bcrypt')
router.use(express.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());
dotenv.config();
const Authentication = require('../middleware/Authentication');
const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const Instructor = require("../models/instructorregisterSchema");

router.post('/login', async(req, res) => {
    try {
        const { email, password, userrole } = req.body;

        if (!email || !password || !userrole) {
            return res.sendStatus(400);
        }

        const userLogin = await User.findOne({ email: email });
        const instructorlogin = await Instructor.findOne({ email: email });

        if (userLogin && userrole == "STUDENT") {
            const isMatch = await bycrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken();

            res.cookie("jwtToken", token, {
                expires: new Date(2147483647 * 1000),
                httpOnly: true
            })
            
            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {

                res.status(200).json({ msg: "login Succesfully" })
            }
        } else if (instructorlogin && userrole == "INSTRUCTOR") {
            const isMatch = await bycrypt.compare(password, instructorlogin.password)
            const token = await instructorlogin.generateAuthToken();
      
            res.cookie("jwtToken", token, {
                expires: new Date(2147483647 * 1000),
                httpOnly: true
            })
             
            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {
                res.status(200).json({ msg: "login Succesfully" })
            }
        } else {
            return res.status(402).json({ msg: "Invalid Credential" });
        }
    } catch (err) {
        res.json({ msg: "error occured" + err })
    }
})

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////------Admin Route--------//////////////////////////////
router.post('/adminlogin', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }

        const adminLogin = await Admin.findOne({ email: email });

        if (adminLogin) {
            const isMatch = await bycrypt.compare(password, adminLogin.password)
            const token = await adminLogin.generateAuthToken();

            res.cookie("jwtTokenAdmin", token, {
                expires: 0,
                httpOnly: true
            })

            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credential" });
            } else {

                res.status(200).json({ msg: "Login Succesfully" })
            }
        } else {
            return res.status(402).json({ msg: "Invalid Credential" });
        }
    } catch (err) {
        res.json({ msg: "error occured" + err })
    }
})

module.exports = router;