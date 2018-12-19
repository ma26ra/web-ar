var webpack = require('webpack');

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin()
];

module.exports = {
  entry: "./js/index.js",
  output: {
    filename: "main.js"
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false}]
              ]
            }
          }
        ]
      }
    ]
  }
}
