const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("./config/key");
const passport = require("passport");

// mongoose database options.
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const PORT = config.PORT || 3000;

// connect to mongodb database.
mongoose
    .connect(config.MONGODB_URI, dbOptions)
    .then(() => {
        console.log(
            `[mongoDB]: connected to database, starting application...`
        );

        // defining the express app.
        const app = express();

        // adding helmet to enhance the API's security.
        app.use(helmet());

        // using body-parser to parse JSON bodies into JS objects.
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // using cookie-parser to parse cookies into JS objects.
        app.use(cookieParser());

        // enabling cors for all requests.
        app.use(
            cors({
                credentials: true,
                origin: true,
            })
        );

        // adding morgan to log HTTP requests.
        app.use(morgan("combined"));

        // initialize passport middleware.
        app.use(passport.initialize());
        require("./middleware/jwt")(passport);

        // configuring routes.
        require("./routes/index")(app);

        process.env.NODE_ENV === "development" ?? mongoose.set("debug", true);

        setTimeout(() => {
            app.listen(PORT, () => {
                console.log(
                    `[server]: application started, running on port ${PORT}`
                );
            });
        });
    })
    .catch((err) => {
        console.log(`[mongoDB]: could not connect to database, error:\n${err}`);
    });
