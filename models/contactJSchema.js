const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    
    queryId: {
      type: Number,
      required: true,
      unique : true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo : {
      type: Number,
      required: true,
    },
    message :{
      type: String,
      required: true,
    },
    time : {
      type: String,
      required: true,
    },
    querySolved : {
      type: Boolean,
      default: false,
    }
   
  }
);

const ContactQueries = mongoose.model("CONTACTSQUERIES", contactSchema);

module.exports = ContactQueries;