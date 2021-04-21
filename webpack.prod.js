const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	//mode: 'production',
	mode: 'development',
	output: {
		filename: 'prod.[name].js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'prod.[name].css',
		}),
	],
});
