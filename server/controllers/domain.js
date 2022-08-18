const { Domains } = require("../models/Domains");

/**
 * @route - POST /api/domains/create
 * @desc - create a new domain
 * @access - public
 */

exports.create = async (req, res) => {
	try {
		const {
			clientId,
			domainName,
			domainPeriod,
			domainRegistrant,
			domainRegisterDate,
			domainExpireDate,
			domainPrice,
			domainStatus,
		} = req.body;
		const domain = new Domains({
			clientId,
			domainName,
			domainPeriod,
			domainRegistrant,
			domainRegisterDate,
			domainExpireDate,
			domainPrice,
			domainStatus,
		});
		await domain.save();
		res.status(200).json({
			message: "domain created successfully.",
			domain,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
