const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = path.join(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production ';

module.exports = {
	entry: {
		app: path.resolve(__dirname, './src/app.js')
	},
	output: {
		path: outputPath,
		publicPath: '/dist/',
	},	
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [`${outputPath}/*.hot-update.*`],
			dangerouslyAllowCleanPatternsOutsideProject: true,
			dry: false,
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
				proxy: 'https://atc-dev.outsystemsenterprise.com/Care_MUI'
        //proxy: 'https://miguelfilipe-gomes.outsystemscloud.com/ToDo_MFSG/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
				reload: true
      }
    )
	],
	node: {
		fs: 'empty',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: !isProduction,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: !isProduction,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
							sassOptions: {
                fiber: require('fibers'),
              },
							sourceMap: !isProduction,
							// prependData: () => {
							// 	const path =
							// 		isProduction
							// 			? '/Sapphirev2_Th/fonts/Lato-Regular.ttf'
							// 			: 'https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i,900,900i&display=swap';
							// 	return `$font-url: '${path}';`;
							// },
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
					},
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
		],
	},
};
