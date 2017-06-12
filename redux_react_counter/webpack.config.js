module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-maps',
    devServer: {
        baseContent: './'
    },
    module: {
        loaders: [{
            loader: 'babel',
            exclude: /node_modules/,
            test: /js$/
        }
        ]
    }
}