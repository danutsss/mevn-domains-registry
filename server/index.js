// importing the required dependencies.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

// dotenv
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// mongoose database options.
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let dbUri = "";
if (process.env.NODE_ENV === "development") {
    dbUri = process.env.MONGODB_DEV;
} else if (process.env.NODE_ENV === "production") {
    dbUri = process.env.MONGODB_PROD;
} else {
    dbUri = process.env.MONGODB_TEST;
}

// connect to mongodb database.
mongoose
    .connect(dbUri, dbOptions)
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

        // importing the routes.
        app.use("/api", require("./clients/routes.config"));

        process.env.NODE_ENV === "development" ?? mongoose.set("debug", true);

        setTimeout(() => {
            app.listen(PORT, () => {
                console.log(
                    `[server]: application started, running on port ${PORT}`
                );
            });
        });
    })
    .catch((err) =>
        console.log(`[mongoDB]: could not connect to database, error: ${err}`)
    );
