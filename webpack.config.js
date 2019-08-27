var path = require('path');

var ENV = process.env.npm_lifecycle_event;

if(ENV === 'build'){
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
                    include: [
                        path.resolve(__dirname, "src")
                    ],
                    test: path.join(__dirname, 'src'),
                    query: {
                        presets: 'env'
                    },
                }
            ]
        },
        resolve: {
            extensions: ['js'],
          }
    };

}


module.exports = config;
