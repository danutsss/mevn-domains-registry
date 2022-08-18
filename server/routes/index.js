const auth = require("./auth");
const user = require("./user");
const invoice = require("./invoice");
const domain = require("./domain");

const authenticate = require("../middleware/authenticate");

module.exports = (app) => {
	app.get("/", (req, res) => {
		res.status(200).send({
			message: "welcome to our API.",
		});
	});

	app.use("/api/auth", auth);
	app.use("/api/client", authenticate, user);
	app.use("/api/user", user);
	app.use("/api/invoices", invoice);
	app.use("/api/domains", domain);
};
