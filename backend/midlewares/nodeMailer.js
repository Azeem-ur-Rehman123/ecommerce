import nodemailer from 'nodemailer';

export const mailer = (userEmail, otp) => {
  const myotp = 'Otp :' + otp;
  let transporter = nodemailer.createTransport({
    service: process.env.service,
    port: process.env.port,
    secure: false,

    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    from: process.env.user,
    to: userEmail,
    subject: 'Account Recovery',
    text: myotp,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.log('success');
  });
};
