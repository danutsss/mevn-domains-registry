const express = require("express");
const Invoice = require("../controllers/invoice");

const router = express.Router();

router.post("/create", Invoice.create);

module.exports = router;
