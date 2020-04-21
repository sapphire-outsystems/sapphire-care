const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
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
		//open:true,
		// index:'',
		// proxy: {
		// 	'**': {
		// 		target: 'https://atc-dev.outsystemsenterprise.com',
		// 		openPage:'/Care_MUI',
		// 		changeOrigin: true,
		// 		secure: true,
				
		// 	}
		// }
	},
	watch: true,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: 'dev.[name].css',
		}),
		new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
				// through BrowserSync
				//proxy: 'https://atc-dev.outsystemsenterprise.com/Care_MUI'
        proxy: 'https://miguelfilipe-gomes.outsystemscloud.com/ToDo_MFSG/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
				reload: true
      }
		)
		
	],

});
