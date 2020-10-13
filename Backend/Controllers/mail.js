import mailer from "nodemailer";
import Form from "./template.js";
import { createTokens } from "./jwt/jwt.js";

const getEmailData = (to, name, template) => {
  let data = null;

  switch (template) {
    case "verify-email":
      data = {
        from: "Amazon Team <simransingh12340@gmail.com>",
        to,
        subject: `Hi ${name}, Amazon Team Verify email Address`,
        html: Form(name),
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent successfully");
    }
    smtpTransport.close();
  });
};
export default sendEmail;
