var path = require('path');
var webpack = require('webpack');
var packageJSON = require('./package.json');

var ENV = process.env.npm_lifecycle_event;

config = {
        entry: {
            'skw': './src/index.js'
        },
        output: {
            path: path.resolve(__dirname,'./dist/'),
            library:'skw',
            libraryTarget: 'umd',
            filename:  '[name].js'
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    test: path.join(__dirname, 'src'),
                    query: {
                        presets: 'env'
                    },
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin(" skw v"+packageJSON.version+"\r\n By https://github.com/fxueye \r\n Github: https://github.com/fxueye/skw\r\n MIT Licensed."),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        stats: {
            colors: true
        },
        resolve: {
            // extensions: ['js'],
        }
};
if(ENV === "build-min"){
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8 : false
        },
        mangle: {
            screw_ie8: false
        },
        output: { screw_ie8: false }
    }));
    config.entry = {
        'skw.min': './src/index.js'
    };
}

module.exports = config;
