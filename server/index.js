const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("./config/key");

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

        // enabling cors for all requests.
        app.use(cors());

        // adding morgan to log HTTP requests.
        app.use(morgan("combined"));

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
        console.log(`[mongoDB]: could not connect to database, error: ${err}`);
    });
