path = require('path')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    demo: './demo/demo.ts',
  },
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: '[name].js',
    publicPath: '/demo/',
    path: path.resolve(__dirname, '.dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@atrackt/core$': path.resolve(__dirname, 'core', 'core.ts'),
      '@atrackt/core/handler$': path.resolve(__dirname, 'core', 'handler.ts'),
      '@atrackt/core/service$': path.resolve(__dirname, 'core', 'service.ts'),
      '@atrackt/handler-dom$': path.resolve(
        __dirname,
        'handlers',
        'dom',
        'dom.ts'
      ),
    },
  },
}
