var nodemailer = require('nodemailer');

const sendRegistrationEmail = async(UseremailId, username) => {
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
        subject: 'Hurray, You have successfully registered with UpLearn!',
        html: `<p>Hello ${username},</p>
        <p>Welcome to UpLearn!</p>
        <img style="width: 100%; border-radius: 6px; height: 75%" src="https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg?w=2000"></img>
        <p>
        By joining our community of learners, you have gained an easy access to:
        </p>
        <ul style="padding-left: 20px;">
    
            <li>Hundreds of Academic Resources from our finest instructors.</li>
            <li>Quizzes and Tests to test your knowledge.</li>
            <li>Video lectures to facilitate visual learning</li>
            <li>Latest notifications about upcoming competitive exams </li>
            <li>Among many more!</li>
        </ul>
        <div style="margin-left: 20px;">
        <a href="#"><button style="padding: 8px; background-color: #33A0FF;border-radius: 4px; border: 0.05rem solid #f0f0f0; outline:none; cursor: pointer;">Explore Now</button></a>
        </div>
        <p>
        Happy Learning! We're glad to have you with us!
        </p>
    
        <p>
            Regards,<br> Team UpLearn
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
module.exports = sendRegistrationEmail