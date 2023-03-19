const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
router.use(express.json());
dotenv.config();
const Subscribers = require("../models/subscriberSchema");

router.post("/SubscriberRegister", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.sendStatus(201);
    }

    Subscribers.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                return res.sendStatus(422);
            }
            const Subscriber = new Subscribers({
                email
            });
            Subscriber
                .save()
                .then(() => {
                    res
                        .status(200)
                        .json({ msg: "Subscription Successful" });
                })
                .catch((err) => {
                    res.status(501).json({ msg: "Failed to Subscribe" });
                });
        })
        .catch((err) => {
            console.log("error" + err);
        });
});

router.get('/Subscriberlist', (req, res) => {
    Subscribers.find({}).then((result) => {
        res.send(result)
    });
})

module.exports = router;