const express = require("express");
const { check } = require("express-validator");

const Auth = require("../controllers/auth");
const Password = require("../controllers/password");
const validate = require("../middleware/validate");
const { route } = require("./user");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send({
        message:
            "you are in the auth endpoint. login or register to test authentication.",
    });
});

// register.
router.post(
    "/register",
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
    Auth.register
);

router.post(
    "/login",
    [
        check("email").isEmail().withMessage("email is required."),
        check("password").not().isEmpty().withMessage("password is required."),
    ],
    validate,
    Auth.login
);

// email verification.
router.get("/verify/:token", Auth.verify);
router.post("/resend", Auth.resend);

// password reset.
router.post(
    "/recover-password",
    [check("email").isEmail().withMessage("email is required.")],
    validate,
    Password.recover
);

route.rget("/reset/:token", Password.reset);

router.post(
    "/reset/:token",
    [
        check("password").not().isEmpty().withMessage("password is required."),
        check("confirm_password", "passwords do not match.").custom(
            (value, { req }) => value === req.body.password
        ),
    ],
    validate,
    Password.resetPassword
);

module.exports = router;
