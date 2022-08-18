const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
	{
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			ref: "Client",
		},
		domainName: {
			type: String,
			trim: true,
		},
		domainPeriod: {
			type: String,
			trim: true,
		},
		domainRegistrant: {
			type: String,
			trim: true,
		},
		domainRegisterDate: {
			type: Date,
			trim: true,
		},
		domainExpireDate: {
			type: Date,
			trim: true,
		},
		domainPrice: {
			type: String,
			trim: true,
		},
		domainStatus: {
			type: String,
			trim: true,
		},
	},
	{ collection: "domains", timestamp: true }
);

const Domains = mongoose.model("Domains", domainSchema);
module.exports = { Domains };
