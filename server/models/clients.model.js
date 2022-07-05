const mongoose = require("mongoose");

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
    },
    { collection: "clients" }
);

exports.Client = mongoose.model("Client", clientSchema);
