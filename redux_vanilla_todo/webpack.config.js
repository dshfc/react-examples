module.exports = {

    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: './'
    },
    module: {
        loaders: [{
            loader: 'babel',
            test: /js$/,
            exclude: /node_modules/
        }]
    },
    devServer: {
        contentBase: './'
    },
    devtool: 'inline-source-map'
}