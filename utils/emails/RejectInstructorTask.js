var nodemailer = require("nodemailer");

const sendRejectTaskmsg = async (email, name, duedate, message) => {
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
    subject: 'Your Task is Rejected !',
    text:
      "Hello " +
      name +
      ", \n\n" +
      message +
      "\nThe new due date to submit task is : " +
      duedate +
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
module.exports = sendRejectTaskmsg;
