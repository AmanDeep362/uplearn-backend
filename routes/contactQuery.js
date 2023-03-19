const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const contactemail = require("../utils/emails/contactemail");
const sendReplyMsg = require("../utils/emails/sendReplyMsg");

const ContactData = require("../models/contactJSchema");

router.post("/contactus", (req, res) => {
    try {
        const { name, email, phoneNo, message } = req.body;
        if (!name || !email || !phoneNo || !message) {
            res.json({ msg: "filled are required to fill" });
        } else {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yy = today.getFullYear();
            let hh = today.getHours();
            let mi = today.getMinutes();
            let ss = today.getSeconds();
            let time = dd + "/" + mm + "/" + yy + "(" + hh + ":" + mi + ":" + ss + ")";
            const queryId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
            const newContactData = new ContactData({
                name,
                email,
                phoneNo,
                message,
                queryId,
                time
            });
            newContactData
                .save()
                .then(() => {
                    res.status(201).json({ msg: "data added succesfuly" });
                    contactemail(newContactData.email, newContactData.name, newContactData.queryId)
                })
                .catch((err) => {
                    res.json({ msg: "data not added error occured" });
                });
        }
    } catch (error) {
        console.log("error occcured " + error);
    }
});

router.get("/contactResult", (req, res) => {
    ContactData.find({ querySolved: false }).then((result) => {
        res.send(result)
    })
})

router.post("/sendreplyforcontact", (req, res) => {
    try {
        const { _id, name, email, subject, body } = req.body;

        ContactData.findByIdAndUpdate(_id, {
                querySolved: true
            },
            function(err, docs) {
                if (err) {
                    console.log("error occured" + err)
                } else {
                    sendReplyMsg(email, name, subject, body).then(() => {
                        res.status(200).json({ msg: "mail sent Succesfully" })
                    }).catch((err) => {
                        res.status(400).json({ msg: "error occured" })
                    })
                    console.log("Query Resolved Successful");
                }
            })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;