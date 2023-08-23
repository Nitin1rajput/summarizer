const { merge } = require("webpack-merge");
const config = require('./webpack.common');

module.exports = merge({
    mode: 'development',
    devtool: 'inline-source-map'
})