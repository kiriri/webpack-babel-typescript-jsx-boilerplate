const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

const config = {
	// Environment mode
	mode: 'development',

	// Entry point of app
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.m?(j|t)sx?$/,
      			exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: ["@babel/preset-env", "@babel/preset-typescript"],
					plugins: [
						[
							"@babel/plugin-transform-react-jsx",
							{
								"runtime": "automatic",
								"importSource": "../runtime",
							}
						]
					]
				}
			}
		]
	},
	plugins: [
		// Re-generate index.html with injected script tag.
		// The injected script tag contains a src value of the
		// filename output defined above.
		new HtmlWebpackPlugin({
		  inject: true,
		  template: path.resolve('public/index.html'),
		}),
	  ],
	resolve: {
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules')
		],
		extensions: ['.ts', '.tsx', '.js', '.json']
	},
	devServer: {
		hot: true,
		compress: true,
		port: 9000,
		open: true
	},
	watch: false,
	devtool: 'source-map',
};

module.exports = config;