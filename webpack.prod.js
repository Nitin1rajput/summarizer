const { merge } = require("webpack-merge");
const config = require('./webpack.common');

module.exports = merge({
    mode: 'production',
})