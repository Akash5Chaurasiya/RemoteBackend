const path = require("path");
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    watch: true,
    entry: path.resolve(__dirname, "./index.ts"),
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                // include: [path.resolve(__dirname, "/src")],
                exclude: path.resolve(__dirname, "node_modules"),
            },
        ],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "public"),
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@": path.resolve(""),
        },
    },
    externalsPresets: {
        node: true,
    },
    externals: [nodeExternals()]
};
