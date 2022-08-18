const express = require("express");
const Invoice = require("../controllers/invoice");

const router = express.Router();

router.post("/create", Invoice.create);
router.get("/:id/all", Invoice.showall);

module.exports = router;
