var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'main.js': './src/App.js',
        'expression/annotator': './src/pages/ExpressionAnnotator.js',
        'expression/viewer': './src/pages/ExpressionAnnotationsViewer.js',
        'phenotype/annotator': './src/pages/PhenotypeAnnotator.js',
        'phenotype/viewer': './src/pages/PhenotypeAnnotationsViewer.js',
        'anatomyFunction/annotator': './src/pages/AnatomyFunctionAnnotator.js',
        'anatomyFunction/viewer': './src/pages/AnatomyFunctionAnnotationsViewer.js',
        'entity-picker': './src/pages/EntityPicker.js',
        'autocomplete': './src/autocomplete.js'
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

