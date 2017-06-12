module.exports = {
    entry: ['babel-regenerator-runtime', './main.js'],
    output: {
        path: './',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\jsx?$/,
                exclude: /node_modules/
            }
        ]
    }

}