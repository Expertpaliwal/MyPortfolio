const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
    try{
    const { name, email, msg } = req.body;

        //validation
        if (!name || !email || !msg) {
        return res.status(500).send({
            success: false,
            message: "Please Provide All Fields",
        });
        }

    let info = await transporter.sendMail({
        from: {
        name : 'Myweb',
            address: process.env.USER 
        },
            // sender address
        
        to: process.env.USER, // list of receivers
        subject: "Mail to Sourabh By portfolio", // Subject line
        html: `
        <h5>Detail Information</h5>
        <ul>
        <li><p>Name : ${name}</p></li>
        <li><p>Email : ${email}</p></li>
        <li><p>Message : ${msg}</p></li>
        </ul>
    `,
    });

    return res.status(200).send({
        success: true,
        message: "Your Message Send Successfully",
    });
    }
    catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = sendMail;