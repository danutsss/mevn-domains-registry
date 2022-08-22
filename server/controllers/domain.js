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
			domainInvoiceId,
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
			domainInvoiceId,
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

/**
 * @route - GET /api/domains/:id/all
 * @desc - get all user's domains
 * @access - public
 */
exports.showall = async (req, res) => {
	try {
		const domains = await Domains.find({ clientId: req.params.id });
		res.status(200).json({
			message: "domains found successfully.",
			domains,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
