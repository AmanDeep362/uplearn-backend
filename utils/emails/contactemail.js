var nodemailer = require('nodemailer');

const contactmail = async(UseremailId, username, QueryId) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'uplearnforsih@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'uplearnforsih@gmail.com',
        to: UseremailId,
        subject: 'Your Request have been Created || UpLearn Support',
        html: `
            <p>Hi ${username},</p>

            <p>Thank you for writing to UpLearn. Your request is important to us. 
            Therefore, we are raising a ticket on your request and sharing it with our Support Agent. 
            Your Query ID is <strong>${QueryId}</strong>. You will be reached out shortly.</p>

            <p>Please stay connected.</p>
            
            <p>Regards, <br>
               UpLearn Support Team </p>`

    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = contactmail