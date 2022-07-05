const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Client } = require("../models/clients.model");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

router.post("/register", async (req, res) => {
    const encryptedPassword = await bcrypt.hashSync(
        req.body.password,
        saltRounds
    );
    const existingClient = await Client.findOne({ email: req.body.email });
    if (existingClient) {
        return res.status(400).json({
            success: false,
            message: "there is already a client with that email",
        });
    } else {
        Client.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: encryptedPassword,
            cnp: req.body.cnp,
            nr_reg_com: req.body.nr_reg_com,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            county: req.body.county,
            email: req.body.email,
            person_type: req.body.person_type,
        })
            .then((client) => {
                const token = jwt.sign(
                    {
                        clientId: client._id,
                        email: client.email,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_DURATION }
                );
                res.json({
                    success: true,
                    token: token,
                });
            })
            .catch((err) => {
                // console debug.
                console.log(`[error]: when trying to register:\n\n${err}`);
                res.json({
                    success: false,
                    error: err,
                });
            });
    }
});

router.post("/login", (req, res) => {
    Client.findOne({ email: req.body.email })
        .then((client) => {
            if (!client) {
                res.json({
                    success: false,
                    error: "client account does not exists.",
                });
            } else {
                if (!bcrypt.compareSync(req.body.password, client.password)) {
                    res.json({
                        success: false,
                        error: "wrong password.",
                    });
                } else {
                    const token = jwt.sign(
                        {
                            clientId: client._id,
                            email: client.email,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: process.env.JWT_DURATION,
                        }
                    );
                    res.json({ success: true, token: token });
                }
            }
        })
        .catch((err) => {
            // console debug.
            console.log(`[error]: when trying to login:\n\n${err}`);
            res.json({
                success: false,
                error: err,
            });
        });
});

module.exports = router;
