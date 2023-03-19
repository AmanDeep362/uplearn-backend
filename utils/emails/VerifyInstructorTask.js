var nodemailer = require("nodemailer");

const sendVerifyTaskmsg = async (email, name) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "uplearnforsih@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: "uplearnforsih@gmail.com",
    to: email,
    subject: "Hurray, Task Verified Successfully!",
    text:
      "Hello " +
      name +
      ", \nI hope you are doing well. \n\n" +
      "Your recent task is verified successfully by Admin.Thank you for such a wonderful contribution." +
      "\n\nRegards,\nTeam UpLearn",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendVerifyTaskmsg;
