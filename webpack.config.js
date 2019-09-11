const path = require('path');

module.exports = {
	entry: './client/index.js', // assumes your entry point is the index.js in the root of your project folder
	mode: 'development',
	output: {
		path: __dirname, // assumes your bundle.js will also be in the root of your project folder
		filename: './public/bundle.js',
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: [path.resolve(__dirname, 'client')],
				use: {
					loader: 'babel-loader',
				},
			}, // use the style-loader/css-loader combos for anything matching the .css extension
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

// By setting babel-loader in your webpack config, you're teaching webpack to use babel.
//However, we also need to tell babel how to parse our code. We do this with another dot-file called .babelrc!
// In your root project directory, make a file called .babelrc and configure it with the babel-presets you installed.
