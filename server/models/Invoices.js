const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
	{
		invoiceNumber: {
			type: String,
			trim: true,
		},
		clientId: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			ref: "Client",
		},
		invoiceClientId: {
			type: String,
			trim: true,
		},
		invoiceDate: {
			type: Date,
			trim: true,
		},
		invoiceDueDate: {
			type: Date,
			trim: true,
		},
		invoiceEmailSentDate: {
			type: Date,
			trim: true,
		},
		invoiceStatus: {
			type: String,
			trim: true,
		},
		invoiceTotal: {
			type: String,
			trim: true,
		},
		invoiceItems: {
			type: Array,
			trim: true,
		},
	},
	{ collection: "invoices", timestamps: true }
);

const Invoices = mongoose.model("Invoices", invoiceSchema);
module.exports = { Invoices };
