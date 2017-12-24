const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/Routes.js'),

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},

	resolve: {
		modules: [
			path.resolve(__dirname),
			'node_modules'
		]
	},

	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					presets: [['es2015', { 'modules': false }], 'react'],
					plugins: [
						'transform-object-rest-spread',
						'transform-decorators-legacy',
						'transform-class-properties'
					]
				}
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			hash: false,
			inject: false,
			template: 'src/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
};
