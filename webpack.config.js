const path = require('path');

module.exports = {
    entry: './resource/ts/app.tsx',
    module: {
        rules: [
            {
                test: /\.(tsx?|jsx?)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resource/ts')
        },
        extensions: ['.ts', '.js', '.tsx', 'jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: 'dist/',
    },
    devServer: {
        hot: true,
        open: true
    }
}
