const mongoose = require("mongoose");

const Image = new mongoose.Schema(
  {
    
    image: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
   
  }, { collection: "image-data" }
);

const IMAGE = mongoose.model("ImageData", Image);

module.exports = IMAGE;