const webpack = require("webpack");

module.exports = {
	entry: {
		filename: "./server.js"
	},
	target: "node",
	output: {
		filename: "build/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: [
						["es2015", { "modules": false }]
					]
				}
			}
		]
	}
}