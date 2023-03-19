var nodemailer = require('nodemailer');
const puppeteer = require('puppeteer')

const sendInstructorRegistrationEmail = async(UseremailId, username, Id, Image, password, subject) => {

    const EmailContent = `<div style="display: flex; 
    align-items: center; 
    justify-content: center;
    width: 100%;
    height: 70vh;
    ">
    <div style="
        width: 45rem;
        border: 2px solid black;
        border-radius: 8px;
        margin: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
      ">

      <div style="
          width: 100%;
          background: linear-gradient(
            45deg,
            rgb(152, 199, 238),
            rgb(127, 229, 255)
          );
        ">
          <img src="https://res.cloudinary.com/uplearn/image/upload/v1659509707/kvljhehlocsdoqkhtkj6.ico" alt="Logo" width="60px" height="60px" style="margin: 4px" />
          <span style="font-size: 2rem; position: relative; top: -22px"><span style="color: blue">Up</span>Learn</span>
          <h1 style="text-align: center; padding: 0; margin: 0">
              Instructor Id Card
          </h1>
      </div>

      <div style="width: 100%">
          <table>
              <tbody>
                  <tr>
                      <td style="padding: 0; text-align: center;">
                          <img src=${Image} alt="avtar-img" width="160px" height="160px" style="margin: 3px 8px 0px" />
                      </td>

                      <td style="padding: 12px 1rem; width: 100%;">
                          <div style="border-bottom: 2px solid blue; padding: 6px; margin: 1rem; margin-top: 0px;">
                              <h3 style="display: inline;">Name : </h3>
                              <span>${username}</span>
                          </div>

                          <div style="border-bottom: 2px solid blue; padding: 6px; margin: 1rem">
                              <h3 style="display: inline;">Subject : </h3>
                              <span>${subject}</span>
                          </div>

                          <div style="border-bottom: 2px solid blue; padding: 6px; margin: 1rem">
                              <h3 style="display: inline;">Email Id : </h3>
                              <span>${UseremailId}</span>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
          <h3 style="margin: 8px 12px;">Id: ${Id}</h3>
      </div>
    </div>
    </div>`;
    async function printPDF() {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(EmailContent, { waitUntil: ['networkidle0', 'domcontentloaded', 'load'] });
        const pdf = await page.pdf({ format: 'A4', printBackground: true });

        await browser.close();
        return pdf
    }
    printPDF().then(async(Pdf) => {


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
            subject: 'Hurray, You have successfully registered with UpLearn as Instructor!',
            html: `<p>Hello ${username},</p>
            <p>Welcome to UpLearn!</p>

            <p>
             Congratulations! Your Instructor request is accepted and now you Registered as a Instructor in Uplearn
            </p>
            <p>
             <strong>Your Login Credentials :</strong>
             <p>User Id : ${UseremailId}</p>
             <p>Password : ${password} </p>
             <p><i style="color :red">Note : This is Your login Credentials Please, do not Disclose to anyone or Change password </i></p>
            </p>
            <p>
              We're glad to have you with us!
            </p>
        
            <p>
                Regards,<br> Team UpLearn
            </p>`,
            attachments: [{
                filename: username + '_UpLearn_IdCard',
                content: Pdf,
                contentType: 'application/pdf'
            }]
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }).catch((err) => {
        console.log(err);
    })





}
module.exports = sendInstructorRegistrationEmail