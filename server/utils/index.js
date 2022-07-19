const sgMail = require("@sendgrid/mail");
const config = require("../config/key");

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sendEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
};

module.exports = { sendEmail };
