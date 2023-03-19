const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    AuthorName: {
        type: String,
        required: true,
    },
    bookCategory: {
        type: String,
        required: true,
    },
    bookSubject: {
        type: String,
        required: true,
    },
    bookclass: {
        type: String,
    },
    BookImage: {
        type: String,
        required: true,
    },
    BookPdf: {
        type: String,
        required: true,
    }
  });

const LIBRARY = mongoose.model("LIBRARY", librarySchema);
module.exports = LIBRARY;