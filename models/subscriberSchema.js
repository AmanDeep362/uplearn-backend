const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
  });

const SUBSCRIBERS = mongoose.model("SubscriberList", SubscriberSchema);
module.exports = SUBSCRIBERS;