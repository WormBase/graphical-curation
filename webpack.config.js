var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'main.js': './src/App.js',
        'expression/table': './src/components/ExpressionAnnotationTable.js',
        'phenotype/table': './src/components/PhenotypeAnnotationTable.js',
        'anatomyFunction/table': './src/components/AnatomyFunctionAnnotationTable.js',
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

