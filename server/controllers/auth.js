const { Client } = require("../models/Client");
const Token = require("../models/Token");

const { sendEmail } = require("../utils/index");

/**
 * @route - POST /api/auth/register
 * @desc - register a new client
 * @access - public
 */
exports.register = async (req, res) => {
	try {
		const { email } = req.body;

		// make sure this account doesn't already exists.
		const client = await Client.findOne({ email });

		if (client)
			return res.status(401).json({
				message:
					"the e-mail address you have entered is already associated with another account.",
			});

		const newClient = new Client({ ...req.body });

		const client_ = await newClient.save();

		await sendVerificationEmail(client_, req, res);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @route - POST /api/auth/login
 * @desc - login and return JWT token.
 * @access - public
 */
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const client = await Client.findOne({ email });

		if (!client) {
			return res.status(401).json({
				message:
					"the e-mail address is not associated with any account, double-check your e-mail address and try again.",
			});
		}

		// validate password.
		if (!client.comparePassword(password))
			return res.status(401).json({
				message: "invalid password, please try again.",
			});

		// make sure the user has been verified.
		if (!client.isVerified)
			return res.status(401).json({
				type: "not-verified",
				message:
					"your account has not been verified, please check your e-mail for the verification link.",
			});

		// login successfull, write token, and send back to user.
		res.status(200).json({
			token: client.generateJWT(),
			client: client,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * @route - POST /api/auth/verify
 * @desc - verify a client account.
 * @access - public
 */
exports.verify = async (req, res) => {
	if (!req.params.token)
		return res.status(400).json({
			message: "we we're unable to find a user for this token.",
		});

	try {
		// find a matching token.
		const token = await Token.findOne({ token: req.params.token });

		if (!token)
			return res.status(400).json({
				message:
					"we we're unable to find a valid token for this account, may have been expired.",
			});

		// if we found token, find a matching user.
		Client.findOne(
			{
				_id: token.clientId,
			},
			(err, client) => {
				if (!client)
					return res.status(400).json({
						message:
							"we we're unable to find a user for this token.",
					});

				if (client.isVerified)
					return res.status(400).json({
						message: "your account has already been verified.",
					});

				// verify and save the user.
				client.isVerified = true;
				client.save((err, client) => {
					if (err)
						return res.stauts(500).json({
							message: err.message,
						});

					res.status(200).send(
						"the account has been verified, you can now log in."
					);
				});
			}
		);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * @route - POST /api/resend
 * @desc - resend a verification email.
 * @access - public
 */
exports.resendToken = async (req, res) => {
	try {
		const { email } = req.body;

		const client = await Client.findOne({ email });

		if (!client)
			return res.status(401).json({
				message:
					"the e-mail address is not associated with any account, double-check your e-mail address and try again.",
			});

		if (client.isVerified)
			return res.status(401).json({
				message: "your account has already been verified.",
			});

		await sendVerificationEmail(client, req, res);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

async function sendVerificationEmail(client, req, res) {
	try {
		const token = client.generateVerificationToken();

		// save the verification token.
		await token.save();

		let subject = "account verification";
		let to = client.email;
		let from = "matei@07internet.ro";
		let link = `http://${req.headers.host}/api/auth/verify/${token.token}`;
		let html = `<h1>Please verify your account</h1>
        <p>Please click the link below to verify your account:</p>
        <a href="${link}">${link}</a>`;

		await sendEmail({ to, from, subject, html });

		res.status(200).json({
			message: `the verification email has been sent to ${client.email}.`,
		});
	} catch (error) {
		res.status(500).json({
			message: error,
		});
	}
}
