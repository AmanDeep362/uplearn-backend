var nodemailer = require("nodemailer");

const AddtoClassEmail = async (username,UseremailId,ClassName,ClassDescription,Instructor,Subject,Class) => {
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
    to: UseremailId,
    subject: "Someone is Added you in their Class!",
    html: `<p>Hello ${username},</p>
        <p>Welcome to UpLearn!</p>
        <p>
    One of your Instructor added you in thier class following is the details of class :
        </p>
        <table width="600" border="2px solid blue" color="white"  cellpadding="5px 0px" cellspacing="1">
        <tr>
          <td width="200" bgcolor="#cbcfe2">&nbsp;
            Class Title :
          </td>
          <td width="400" bgcolor="#cbcfe2">&nbsp;
          ${ClassName}
          </td>
        </tr>
        <tr border="2px solid blue">
          <td width="200"  bgcolor="#f0f0f0">&nbsp;
            Class Description :
          </td>
          <td width="400" bgcolor="#f0f0f0">&nbsp;
          ${ClassDescription}
          </td>
        </tr>
        <tr>
          <td width="200" bgcolor="#cbcfe2">&nbsp;
            Subject :
          </td>
          <td width="400" bgcolor="#cbcfe2">&nbsp;
          ${Subject}
          </td>
        </tr>
        <tr>
        <td width="200" bgcolor="#f0f0f0">&nbsp;
        Class :
        </td>
        <td width="400" bgcolor="#f0f0f0">&nbsp;
        ${Class}
        </td>
        </tr>
        <tr>
          <td width="200" bgcolor="#cbcfe2">&nbsp;
            Instructor :
          </td>
          <td width="400" bgcolor="#cbcfe2">&nbsp;
          ${Instructor}
          </td>
        </tr>
      </table>
        <div style="margin-top: 50px;">
        <a href="${process.env.MYPORT+"/"+"StudentDashboard/my-classrooms"}"><button style="padding: 8px; color:white; background-color: #2b4eff;border-radius: 4px; border: 0.05rem solid #f0f0f0; outline:none; cursor: pointer;">View My Class</button></a>
        </div>
        <p>
        Happy Learning! We're glad to have you with us!
        </p>
    
        <p>
            Regards,<br> Team UpLearn
        </p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = AddtoClassEmail;
