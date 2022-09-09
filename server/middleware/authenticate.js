const passport = require("passport");

module.exports = (req, res, next) => {
	passport.authenticate("jwt", function (err, client) {
		if (err) return next(err);

		if (!client)
			return res.status(401).json({
				message: "unauthorized access - no token provided.",
			});

		req.client = client;

		next();
	})(req, res, next);
};
