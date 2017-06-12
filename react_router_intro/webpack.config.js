module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        path: './',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    devServer: {
        contentBase: './'
    }
}