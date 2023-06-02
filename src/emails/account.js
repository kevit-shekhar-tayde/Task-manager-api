const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "shekhar.tayde@kevit.io",
    subject: "Thanks for joining in",
    text: `Welcome to the app ${name}, How are you`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "shekhar.tayde@kevit.io",
    subject: "Sorry to see you go.",
    text: `Hello ${name}, Apologies for the unsatisfactory services but may we know the reasons of your cancellation?`,
  });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
