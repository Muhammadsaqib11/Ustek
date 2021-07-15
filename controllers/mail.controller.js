const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

module.exports.sendMail = async (req, res) => {
  try {
    const data = req.body;
    const body = `There is a new query received from UsTek website using contcat form, you are requested to contact this person with any of the following details:\n\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nOrganization: ${data.organization}\nSelected Services: ${data.services}\nHow can we help: ${data.details}\n\n\nRegards,\nUsTek Team.`;
    const clientBody = `Dear ${data.lastName},\n\n\n\nThanks for your queries/questions. We welcome you for your first step towards USTEK Services. We’ll do everything we can to support or help you. One of our representatives will get back to you shortly!\nHowever, if you have any urgent concern, you can leave a message at ${process.env.MAIL_TO}\n\n\nBest regards,\nUSTEK Services`;
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getDate() +
      " - " +
      months[current_datetime.getMonth()] +
      " - " +
      current_datetime.getFullYear();

    const clientMessage = {
      from: process.env.MAIL_HOST,
      to: data.email,
      subject: `USTEK Services responded against your Query of ${formatted_date}`,
      text: clientBody,
      dsn: {
        id: "",
        return: "full",
        notify: ["failure", "delay"],
        recipient: process.env.MAIL_TO,
      },
    };

    const message = {
      from: process.env.MAIL_HOST,
      to: process.env.MAIL_TO,
      subject: "New Query Received",
      text: body,
      dsn: {
        id: "",
        return: "full",
        notify: ["failure", "delay"],
        recipient: process.env.MAIL_TO,
      },
    };

    const transport = await nodemailer.createTransport({
      pool: true,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_AUTH,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    transport.sendMail(message, function (err, info) {
      if (err) {
        return res.json({ statusCode: 400, message: err.message });
      } else {
        transport.sendMail(clientMessage, function (err, info) {
          if (err) {
            return res.json({ statusCode: 400, message: err.message });
          } else {
            return res.json({ data: "sent", message: "Ok", statusCode: 200 });
          }
        });
      }
    });
  } catch (e) {
    return res.json({ statusCode: 400, message: e.message });
  }
};
