const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  const isDevMode = env.development;

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/build'),
      publicPath: '/',
      filename: '[name].bundle.[contenthash][chunkhash].js',
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    mode: isDevMode ? 'development' : 'production',
    // devtool: 'inline-source-map',
    devServer: {
      port: 3001,
      historyApiFallback: true,
      allowedHosts: 'all',
      client: {
        progress: true,
      },
      proxy: {
        '/api': {
          target: 'https://backend.s1327.skipp.dev/',
          changeOrigin : true,
        },
      },
    },
    target: ['web', 'es5'],
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
      },
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              [
                '@babel/plugin-transform-typescript',
                {
                  isTSX: true,
                },
              ],
            ],
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' },
          ],
        },
        {
          test: /\.woff2?$|\.ttf$|\.eot$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.(png|jpeg|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
          options: {
            removeTags: true,
            removingTags: ['title', 'desc'],
            removeSVGTagAttrs: false,
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new MiniCssExtractPlugin({
        filename: 'bundle.[contenthash].css',
        chunkFilename: '[name].[chunkhash].bundle.css',
        ignoreOrder: true,
      }),
      new HtmlWebpackPlugin({
        template: isDevMode ? './public/develop.html' : './public/index.html',
      }),
    ],
  };
};
