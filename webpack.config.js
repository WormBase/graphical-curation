var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'main.js': './src/App.js',
        'expression/annotator.js': './src/components/ExpressionAnnotator.js',
        'expression/viewer.js': './src/components/ExpressionAnnotationsViewer.js',
        'entity-picker.js': './src/components/EntityPicker.js'
    },
    output: {
        path: path.resolve('lib'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    externals:
    // nodeExternals(),
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
}
