const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const dotenv = require('dotenv');

dotenv.config();

const {CARE_URL,STYLEGUIDE_URL}=process.env;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports =env=>{
	return merge(common, {
	mode: 'development',
	output: {
		filename: 'dev.[name].js',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		https: true,
		watchContentBase: true,
		writeToDisk: true,
		disableHostCheck: true,
		hot: true,
		inline: true,
		liveReload: false,
		progress:true,
		port: 3000,
	},
	watch: true,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: 'dev.[name].css',
		}),
		new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
				proxy: env.url==='care'?CARE_URL:STYLEGUIDE_URL
      },
      {
				reload: true
      }
		)
		
	],	

})};
