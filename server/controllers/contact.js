const { sendEmail } = require("../utils/index");

/**
 * @route - POST /api/contact
 * @desc - send contact form
 * @access - private
 */
exports.contact = async (req, res) => {
	try {
		const { fullname, email, phone, message } = req.body;

		// get e-mail options.
		const options = {
			to: "matei@07internet.ro",
			from: "matei@07internet.ro",
			subject: "new contact form.",
			html: `<h1>New contact form</h1>
                <p>name: ${fullname}</p>
                <p>email: ${email}</p>
                <p>phone: ${phone}</p>
                <p>message: ${message}</p>`,
		};

		await sendEmail(options);

		res.status(200).json({
			message: `an e-mail has been sent to our support team.`,
		});
	} catch (error) {
		res.status(500).json({
			message: error,
		});
	}
};
