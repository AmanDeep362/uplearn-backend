var nodemailer = require('nodemailer');

const sendotp = async(UseremailId, username, OTP) => {
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
        to: UseremailId,
        subject: 'Registration OTP from UpLearn',
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;line-height:2;background: #FAFBFF">
            <div style="margin:20px auto;width:75%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.5em;color: #2b4eff; text-decoration:none; font-weight:600">UpLearn</a>
                </div>
                <p style="font-size:1.1em">Hi ${username},</p>
                <p>Thank you for choosing UpLearn. Use the following OTP to complete your signup procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #2b4eff;margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${OTP}</h2>
                <p style="font-size:1em;">Regards,<br />Team UpLearn</p>
                <hr style="border:none;border-top:1px solid #eee" />
            </div>
        </div>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendotp;