const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
        },
    },
    output: {
        chunkFilename: 'js/[name].js?id=[chunkhash]',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, './resources/js'),
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
