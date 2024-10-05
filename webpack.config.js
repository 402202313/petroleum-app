 
const path = require('path');

module.exports = {
  entry: './src/index.js', // Change this to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Use Babel for .js and .jsx files
        exclude: /node_modules/, // Don't transpile node_modules
        use: {
          loader: 'babel-loader', // Specify the loader
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file extensions
  },
};
