const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = path.join(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production ';

module.exports = {
	entry: {
		app: path.resolve(__dirname, './src/app.js'),
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
	resolve: {
		alias: {
			Settings: path.join(__dirname, 'src/components/00-settings'),
			Tools: path.join(__dirname, 'src/components/01-tools'),
			Generic: path.join(__dirname, 'src/components/02-generic'),
			Elements: path.join(__dirname, 'src/components/03-elements'),
			Base: path.join(__dirname, 'src/components/04-base'),
			Components: path.join(__dirname, 'src/components/05-components'),
			Helpers: path.join(__dirname, 'src/components/06-helpers'),
			Trumps: path.join(__dirname, 'src/components/07-trumps'),
			Adjusts: path.join(__dirname, 'src/components/98-adjustments'),
			Legacy: path.join(__dirname, 'src/components/99-legacy'),
		},
	},
};
