const express = require("express");
const { check } = require("express-validator");
const validate = require("../middleware/validate");

const Contact = require("../controllers/contact");

const router = express.Router();

// send contact form.
router.post(
	"/",
	[
		check("fullname").not().isEmpty().withMessage("full name is required."),
		check("email").isEmail().withMessage("email is required."),
		check("message").not().isEmpty().withMessage("message is required."),
	],
	validate,
	Contact.contact
);

module.exports = router;
