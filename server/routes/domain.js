const express = require("express");
const Domain = require("../controllers/domain");

const router = express.Router();

router.post("/create", Domain.create);
router.get("/:id/all", Domain.showall);

module.exports = router;
