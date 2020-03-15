const path = require('path')

module.exports={
    mode: "production",
    entry:path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}
