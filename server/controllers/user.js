const { Client } = require("../models/Client");
const { sendEmail } = require("../utils/index");

/**
 * @route - POST /api/client
 * @desc - register a new client
 * @access - public
 */
exports.store = async (req, res) => {
	try {
		const { email } = req.body;

		// make sure this account doesn't already exists.
		const client = await Client.findOne({ email });

		if (client)
			return res.status(401).json({
				message:
					"the e-mail address you have entered is already associated with another account.",
			});

		// generate a random password
		const password = `_${Math.random().toString(36).substring(2, 9)}`;
		const newClient = new Client({ ...req.body, password });

		const client_ = await newClient.save();

		// generate and set password reset token.
		client_.generatePasswordReset();

		// save the updated user object.
		await client_.save();

		// get e-mail options.
		let domain = `http://${req.headers.host}`;
		let subject = "new account created.";
		let to = client.email;
		let from = "matei@07internet.ro";
		let link = `${domain}/api/auth/recover-password/${client.resetPasswordToken}`;
		let html = `<h1>Welcome to the app</h1>
        <p>a new account has been created for you on ${domain}.</p>
        <p>please click on the following <a href = ${link}>link</a> to set your password and login.</p>
        <p>your temporary password is: ${password}</p>
        <p>if you did not request this, please ignore this email.</p>`;

		await sendEmail({ to, from, subject, html });

		res.status(200).json({
			message: `an e-mail has been sent to ${client.email}.`,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * @route - GET /api/client/:id
 * @desc - get a client by id
 * @access - public
 */
exports.show = async function (req, res) {
	try {
		const id = req.params.id;

		const client = await Client.findById(id);

		if (!client)
			return res.status(401).json({
				message: "user does not exist.",
			});

		res.status(200).json({
			client,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * @route - PUT api/client/:id
 * @desc - update a client by id
 * @access - public
 */
exports.update = async function (req, res) {
	try {
		const update = req.body;
		const id = req.params.id;
		const clientId = req.client._id;

		// make sure the passed id is that of the logged in user.
		if (clientId.toString() !== id.toString())
			return res.status(401).json({
				message: "you are not authorized to perform this action.",
			});

		const client = await Client.findByIdAndUpdate(
			id,
			{ $set: update },
			{ new: true }
		);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * @route - PUT api/user/:email
 * @desc - update a client by email
 * @access - private
 */
exports.updateByEmail = async function (req, res) {
	try {
		const update = req.body;
		const email = req.body.email;

		const client = await Client.findOneAndUpdate(
			email,
			{ $set: update },
			{ new: true }
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

/**
 * @route - DELETE api/client/:id
 * @desc - delete a client by id
 * @access - public
 */
exports.delete = async function (req, res) {
	try {
		const id = req.params.id;
		const clientId = req.client._id;

		// make sure the passed id is that of the logged in user.
		if (clientId.toString() !== id.toString())
			return res.status(401).json({
				message: "you are not authorized to perform this action.",
			});

		await Client.findByIdAndDelete(id);
		res.status(200).json({
			message: "user deleted.",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
