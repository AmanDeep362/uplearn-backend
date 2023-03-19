const mongoose = require("mongoose");

const PostCareerDetailSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const AddDetails = mongoose.model("POSTCAREERDETAIL", PostCareerDetailSchema);
module.exports = AddDetails;