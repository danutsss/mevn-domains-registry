if (process.env.NODE_ENV === "production") {
    // export production configuration.
    module.exports = require("./prod");
} else {
    // export development configuration.
    module.exports = require("./dev");
}
