const auth = require("./auth");
const user = require("./user");

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
};
