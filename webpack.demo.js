path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    console: './core/console.ts',
    demo: './demo/demo.ts',
    handler: './handlers/dom/dom.ts'
  },
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/demo/',
    path: path.resolve(__dirname, '.dist')
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@atrackt/core$': path.resolve(__dirname, 'core', 'core.ts'),
      '@atrackt/core/handler$': path.resolve(__dirname, 'core', 'handler.ts')
    }
  }
}
