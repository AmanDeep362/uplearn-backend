const express = require("express");
const router = express.Router();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Image = require("../models/Image");

const {
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
} = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});


router.post("/upload_image", upload.single("image"), async (req, res) => {
    cloudinary.uploader.upload(req.file.path, { resource_type: "auto" }, async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
           
        }
   
        const image = await Image.create({
              image: result.secure_url,
            cloudinaryId: result.public_id
        });
        return res.status(201).json({
            image: image
        });
    });
});
module.exports=router