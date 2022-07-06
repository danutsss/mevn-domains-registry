const { Client } = require("../models/Client");

let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    Client.findByToken(token, (err, client) => {
        if (err) throw new Error(`[error: auth] ${err}`);

        if (!client) {
            return res.json({
                isAuth: false,
                error: true,
            });
        }

        req.token = token;
        req.client = client;
        next();
    });
};

module.exports = { auth };
