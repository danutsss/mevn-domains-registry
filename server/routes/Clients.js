const express = require("express");
const router = express.Router();
const { Client } = require("../models/Client");
const { auth } = require("../middleware/Auth");
const config = require("../config/key");

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.client._id,
        isAuth: true,
        first_name: req.client.first_name,
        last_name: req.client.last_name,
        email: req.client.email,
        phone: req.client.phone,
        address: req.client.address,
        city: req.client.city,
        county: req.client.county,
        cnp: req.client.cnp,
        nr_reg_com: req.client.nr_reg_com,
        zip_code: req.client.zip_code,
    });
});

router.post("/register", (req, res) => {
    const client = new Client(req.body);

    client.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            client: doc,
        });
    });
});

router.post("/login", (req, res) => {
    Client.findOne({ email: req.body.email }, (err, client) => {
        if (!req.body.email) {
            return res.json({
                loginSuccess: false,
                message: "authentication failed, e-mail address is required.",
            });
        }
        if (!client) {
            return res.json({
                loginSuccess: false,
                message: "authentication failed, e-mail address not found.",
            });
        }

        client.comparePassword(req.body.password, (err, isMatch) => {
            if (!req.body.password) {
                return res.json({
                    loginSuccess: false,
                    message: "authentication failed, password is required.",
                });
            }
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "authentication failed, password is wrong!",
                });

            client.generateToken((err, client) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", config.JWT_EXPIRY);
                res.cookie("w_auth", client.token).status(200).json({
                    loginSuccess: true,
                    _id: client._id,
                    token: client.token,
                    tokenExp: config.JWT_EXPIRY,
                });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    Client.findOneAndUpdate(
        { _id: req.client._id },
        { token: "", tokenExp: "" },
        (err, doc) => {
            if (err)
                return res.json({
                    success: false,
                    err,
                });
            return res.status(200).send({
                success: true,
            });
        }
    );
});

module.exports = router;
