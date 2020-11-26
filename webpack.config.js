const path = require('path');

module.exports = {
    entry: './resource/app.tsx',
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
        extensions: ['.ts', '.js', '.tsx', 'jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: 'dist/',
    }
}
