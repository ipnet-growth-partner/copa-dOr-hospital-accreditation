const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
    {
        mode: "production",
        entry: {
            processSteps: path.resolve(__dirname, '.', 'build', 'ts', 'pages', 'process-steps.ts')
        },
        output: {
            filename: '[name].min.js',
            path:       path.resolve(__dirname, '.', 'dist', 'js'),
            publicPath: path.resolve(__dirname, '.', 'dist', 'js'),
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            modules: ["node_modules"]
        },
        optimization: {
            minimizer: [new UglifyJsPlugin({
                uglifyOptions: {
                    extractComments: false,
                    warnings: false,
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: true,
                    keep_fnames: false,
                  },
            })]
        }
    }
];