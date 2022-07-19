const { application } = require("express");
const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const User = require("../controllers/user");
const validate = require("../middleware/validate");

const router = express.Router();

// store.
router.post(
    "/",
    [
        check("first_name")
            .not()
            .isEmpty()
            .withMessage("first name is required."),
        check("last_name")
            .not()
            .isEmpty()
            .withMessage("last name is required."),
        check("email").isEmail().withMessage("email is required."),
        check("password").not().isEmpty().withMessage("password is required."),
        check("person_type")
            .not()
            .isEmpty()
            .withMessage("person type is required."),
        check("cnp").not().isEmpty().withMessage("cnp is required."),
        check("phone").not().isEmpty().withMessage("phone is required."),
        check("address").not().isEmpty().withMessage("address is required."),
        check("city").not().isEmpty().withMessage("city is required."),
        check("county").not().isEmpty().withMessage("county is required."),
        check("zip_code").not().isEmpty().withMessage("zip code is required."),
    ],
    validate,
    User.store
);

// show.
router.get("/:id", User.show);

// update.
router.put("/:id", User.update);

// delete.
router.delete("/:id", User.delete);

module.exports = router;
