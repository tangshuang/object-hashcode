module.exports = {
  entry: __dirname + '/src/object-hashcode.js',
  output: {
    path: __dirname + '/dist',
    filename: 'object-hashcode.js',
    library: 'ObjectHashcode',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }] 
          ],
        },
      },
    ],
  },
}