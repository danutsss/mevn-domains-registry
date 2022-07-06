const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    hotReload: true,
                },
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            indentedSyntax: true,
                            sassOptions: {
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
