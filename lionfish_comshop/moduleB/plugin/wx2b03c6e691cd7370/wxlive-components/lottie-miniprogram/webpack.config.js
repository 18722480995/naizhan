
			    "use strict";
			var e = require("path"),
			    l = require("webpack"),
			    r = require("fs");
			module.exports = {
			    entry: "./src/index.js",
			    output: {
			        libraryTarget: "commonjs",
			        filename: "index.js",
			        path: e.resolve(__dirname, "miniprogram_dist")
			    },
			    devtool: "",
			    module: {
			        rules: [{
			            test: /\.js$/i,
			            use: [{
			                loader: "eslint-loader"
			            }, {
			                loader: "babel-loader",
			                options: {
			                    presets: ["@babel/preset-env"],
			                    plugins: ["@babel/plugin-proposal-class-properties"]
			                }
			            }, {
			                loader: "string-replace-loader",
			                options: {
			                    multiple: [{
			                        search: "'__LOTTIE_CANVAS__'",
			                        replace: r.readFileSync("./node_modules/lottie-web/build/player/lottie_canvas.js", {
			                            encoding: "utf8"
			                        })
			                    }, {
			                        search: "__[STANDALONE]__",
			                        replace: ""
			                    }]
			                }
			            }],
			            exclude: /node_modules/
			        }]
			    },
			    amd: !1,
			    plugins: [new l.DefinePlugin({
			        define: {}
			    }), new l.optimize.ModuleConcatenationPlugin]
			};