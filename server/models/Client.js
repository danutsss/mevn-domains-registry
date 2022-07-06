const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/key");

const saltRounds = 10;

const clientSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            maxlength: 36,
            required: [true, "first name is required."],
        },
        last_name: {
            type: String,
            trim: true,
            maxlength: 36,
            required: [true, "last name is required."],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "email is required."],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "password is required."],
        },
        cnp: {
            type: String,
            trim: true,
        },
        nr_reg_com: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            required: [true, "phone is required."],
            match: [
                /\+\d{2}\.\d{9}/,
                "phone number format must be: +40.xxxxxxxxx",
            ],
        },
        address: {
            type: String,
            trim: true,
            required: [true, "address is required."],
        },
        city: {
            type: String,
            trim: true,
            required: [true, "city is required."],
        },
        county: {
            type: String,
            trim: true,
            required: [true, "county is required."],
        },
        token: {
            type: String,
        },
        tokenExp: {
            type: Number,
        },
    },
    { collection: "clients" }
);

clientSchema.pre("save", function (next) {
    var client = this;
    if (client.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(client.password, salt, function (err, hash) {
                if (err) return next(err);
                client.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

clientSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

clientSchema.methods.generateToken = function (cb) {
    var client = this;
    var token = jwt.sign({ _id: client._id.toString() }, config.JWT_SECRET);

    client.token = token;
    client.save((err, client) => {
        if (err) return cb(err);

        cb(null, client);
    });
};

clientSchema.statics.findByToken = function (token, cb) {
    var client = this;

    jwt.verify(token, config.JWT_SECRET, function (err, decode) {
        client.findOne({ _id: decode, token: token }, function (err, client) {
            if (err) return cb(err);
            cb(null, client);
        });
    });
};

const Client = mongoose.model("Client", clientSchema);
module.exports = { Client };
