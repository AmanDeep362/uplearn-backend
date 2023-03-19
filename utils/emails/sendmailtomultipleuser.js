var nodemailer = require('nodemailer');

const sendmailtomultipleuser = async(UserEmails,ScheduleTime,ClassName,ClassDescription,Subject,Class) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'uplearnforsih@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'uplearnforsih@gmail.com',
        to: UserEmails,
        subject: "Your "+Subject+" is Scheduled at "+ScheduleTime,
        cc: "*******",
        html: `
        <h1 style="color:#2b4eff">Your Class is Scheduled by Your Instructor at ${ScheduleTime}</h1>
        <div style="font-family: Helvetica,Arial,sans-serif;line-height:2;background: linear-gradient(to right, #8e2de2, #4a00e0);border-radius:8px;color:white;width:300px;padding:20px 40px">
          <h2>${ClassName}</h2>
          <hr/>
          <p>${ClassDescription}</p>
          <p><span><strong>Class : </strong>${Class+"th"}  </span> <span> <strong> Subject : </strong>${Subject}</span></p>
            <span>&#9201; ${ScheduleTime}</spam>
        </div>
        
        <div style="margin-top: 50px;">
        <a href="${process.env.MYPORT+"/"+"StudentDashboard/my-classroom"}"><button style="padding: 8px; color:white; background-color: #2b4eff;border-radius: 4px; border: 0.05rem solid #f0f0f0; outline:none; cursor: pointer;">View My Class</button></a>
        </div>
        <p>
        Happy Learning! We're glad to have you with us!
        </p>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendmailtomultipleuser;