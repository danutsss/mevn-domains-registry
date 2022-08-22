const { Invoices } = require("../models/Invoices");

/**
 * @route - POST /api/invoices/create
 * @desc - create a new invoice
 * @access - public
 */
exports.create = async (req, res) => {
	try {
		const {
			invoiceNumber,
			clientId,
			invoiceClientId,
			invoiceDate,
			invoiceDueDate,
			invoiceEmailSentDate,
			invoiceStatus,
			invoiceTotal,
			invoiceItems,
		} = req.body;
		const invoice = new Invoices({
			invoiceNumber,
			clientId,
			invoiceClientId,
			invoiceDate,
			invoiceDueDate,
			invoiceEmailSentDate,
			invoiceStatus,
			invoiceTotal,
			invoiceItems,
		});
		await invoice.save();
		res.status(200).json({
			message: "invoice created successfully.",
			invoice,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * @route - GET /api/invoices/:id/all
 * @desc - get all user's invoices
 * @access - public
 */
exports.showall = async (req, res) => {
	try {
		const invoices = await Invoices.find({ clientId: req.params.id });
		res.status(200).json({
			message: "invoices found successfully.",
			invoices,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
