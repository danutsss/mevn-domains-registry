const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/key");

const Token = require("./Token");

const saltRounds = 10;

const clientSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            maxlength: 36,
            required: "your first name is required.",
        },
        last_name: {
            type: String,
            trim: true,
            maxlength: 36,
            required: "your last name is required.",
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: "your e-mail is required.",
        },
        password: {
            type: String,
            trim: true,
            required: "your password is required.",
        },
        person_type: {
            type: String,
            trim: true,
            required: "your person type is required.",
        },
        cnp: {
            type: String,
            trim: true,
            required: "your cnp is required.",
        },
        nr_reg_com: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            required: "your phone is required.",
            match: [
                /\+\d{2}\.\d{9}/,
                "phone number format must be: +40.xxxxxxxxx",
            ],
        },
        address: {
            type: String,
            trim: true,
            required: "your address is required.",
        },
        city: {
            type: String,
            trim: true,
            required: "your city is required.",
        },
        county: {
            type: String,
            trim: true,
            required: "your county is required.",
        },
        zip_code: {
            type: String,
            trim: true,
            required: "your zip code is required.",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: {
            type: String,
            required: false,
        },
        resetPasswordExpires: {
            type: Date,
            required: false,
        },
    },
    { collection: "clients", timestamps: true }
);

clientSchema.pre("save", function (next) {
    const client = this;

    if (!client.isModified("password")) return next();

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(client.password, salt, function (err, hash) {
            if (err) return next(err);

            client.password = hash;
            next();
        });
    });
});

clientSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
};

clientSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        person_type: this.person_type,
        cnp: this.cnp,
        nr_reg_com: this.nr_reg_com,
        phone: this.phone,
        address: this.address,
        city: this.city,
        county: this.county,
        zip_code: this.zip_code,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
    });
};

clientSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
};

clientSchema.methods.generateVerificationToken = function () {
    let payload = {
        clientId: this._id,
        token: crypto.randomBytes(20).toString("hex"),
    };

    return new Token(payload);
};

const Client = mongoose.model("Client", clientSchema);
module.exports = { Client };
