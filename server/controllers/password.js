const { Client } = require("../models/Client");
const config = require("../config/key");
const { sendEmail } = require("../utils/index");

/**
 * @route - POST api/auth/recover-password
 * @desc - send a password reset link to the user's e-mail address.
 * @access - public
 */
exports.recover = async (req, res) => {
    try {
        const { email } = req.body;
        const client = await Client.findOne({ email });

        if (!client)
            return res.status(401).json({
                message:
                    "the e-mail address is not associated with any account, double-check your e-mail address and try again.",
            });

        // generate and set password reset token.
        client.generatePasswordReset();

        // save the updated user object.
        await client.save();

        // send the password reset link to the user's e-mail address.
        let subject = "password change request";
        let to = client.email;
        let from = "matei@07internet.ro";
        let link = `http://${req.headers.host}/api/auth/reset/${client.resetPasswordToken}`;
        let html = `<h1>Please reset your password</h1>
        <p>Please click the link below to reset your password:</p>
        <a href="${link}">${link}</a>`;

        await sendEmail({ to, from, subject, html });

        res.status(200).json({
            message: `a password reset link has been sent to ${client.email}.`,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/**
 * @route - POST /api/auth/recover-password
 * @desc - reset the user's password.
 * @access - public
 */
exports.reset = async (req, res) => {
    try {
        const { token } = req.params;

        const client = await Client.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!client)
            return res.status(401).json({
                message: "password reset token is invalid or has expired.",
            });

        // redirect user to form with the e-mail address.
        res.render("/reset-password", { client });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

/**
 * @route - POST /api/auth/reset
 * @desc - reset the user's password.
 * @access - public
 */
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;

        const client = await Client.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!client)
            return res.status(401).json({
                message: "password reset token is invalid or has expired.",
            });

        // set the new password.
        client.password = req.body.password;
        client.resetPasswordToken = undefined;
        client.resetPasswordExpires = undefined;
        client.isVerified = true;

        // save the updated user object.
        await client.save();

        let subject = "your password has been changed.";
        let to = client.email;
        let from = "matei@07internet.ro";
        let html = `<h1>your password has been changed.</h1>
        <p>it's safe to delete this e-mail.</p>
        <p>this is a confirmation that the password for your account ${client.email} has just been changed.</p>`;

        await sendEmail({ to, from, subject, html });

        res.status(200).json({
            message: "your password has been changed.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
