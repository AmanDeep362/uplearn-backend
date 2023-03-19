const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

///////////////
// This query will help to send upto 50 MB data to backend at a time
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
/////////////////

app.use(require("./routes/register"));
app.use(require("./routes/instructorRegister"));
app.use(require("./routes/verify"));
app.use(require("./routes/loginRoute"));
app.use(require("./routes/logout"));
app.use(require("./routes/imageuploader"));
app.use(require("./routes/Subscribers"));
app.use(require("./routes/contactQuery"));
app.use(require("./routes/aboutUser"));
app.use(require("./routes/updateUserProfile"));
app.use(require("./routes/addCourse"));
app.use(require("./routes/libraryRoute"));
app.use(require("./routes/AssignTask"));
app.use(require("./routes/doubtRoute"));
app.use(require("./routes/postcareerDetail"));
app.use(require("./routes/liveClass"));

// mongodbconnection
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

app.listen(PORT, () => {
  console.log("Server is running port no " + PORT);
});
