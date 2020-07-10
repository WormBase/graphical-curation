var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'main.js': './src/App.js',
        'expression/annotator': './src/components/ExpressionAnnotator.js',
        'expression/viewer': './src/components/ExpressionAnnotationsViewer.js',
        'phenotype/annotator': './src/components/PhenotypeAnnotator.js',
        'phenotype/viewer': './src/components/PhenotypeAnnotationsViewer.js',
        'anatomyFunction/annotator': './src/components/AnatomyFunctionAnnotator.js',
        'anatomyFunction/viewer': './src/components/AnatomyFunctionAnnotationsViewer.js',
        'entity-picker': './src/components/EntityPicker.js'
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

