const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
router.use(express.json());
dotenv.config();
const sendEmailverification = require("../utils/emails/sendotp");

// Route to send Email OTP
router.post("/sendverifyemail", (req, res) => {
    const { name, email, otp } = req.body;
    console.log(name + otp);

    if (otp) {
        sendEmailverification(email, name, otp);
        res.status(200).send({
            message: "Verification Email is sent!!",
        })
    } else {
        res.status(400).send({
            message: "Wrong email id:(",

        })
    }
})

module.exports = router;