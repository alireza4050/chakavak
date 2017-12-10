const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const formatter = require('eslint-friendly-formatter');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        autoprefixer({
          browsers: ['last 2 versions'],
        }),
      ],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      includePaths: [path.resolve('app', 'stylesheets')],
    },
  }];

const config = {
  entry: {
    app: path.resolve('app', 'app.js'),
    vendor: [
      'angular',
      '@uirouter/angularjs',
      'jquery',
      'popper.js',
      'bootstrap',
      'bootstrap4-tagsinput/tagsinput.css',
      'bootstrap4-tagsinput/tagsinput.js',
      'load-google-maps-api-2',
      'ng-file-upload',
      './app/assets/css/style-rtl.beta.min.css',
    ],
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.html', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve('app'), path.resolve('test')],
        options: {
          formatter,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('app'), path.resolve('test')],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders,
        }),
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: false,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join('assets', 'img', '[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join('assets', 'fonts', '[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3030',
    },
    quiet: true,
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' :msg (:elapsed seconds)',
      clear: false,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      disable: process.env.NODE_ENV === 'development',
    }),
    new FaviconsWebpackPlugin({
      logo: './app/assets/img/logo.svg',
      prefix: 'assets/icons-[hash]/',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('app', 'index.html'),
      inject: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        // any required modules inside node_modules are extracted to vendor
        return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0);
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', chunks: ['vendor'] }),
    new FriendlyErrorsPlugin(),
  ],
};

if (process.env.NODE_ENV === 'development') {
  // config.entry.vendor.push('faker'); // ,'angular-mocks', 'json-schema-faker', 'angular-jsf');
  config.devtool = 'inline-source-map';
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    // new BrowserSyncPlugin(
    //   {
    //     // browse to http://localhost:3000/ during development
    //     host: 'localhost',
    //     port: 3000,
    //     // proxy the Webpack Dev Server endpoint
    //     // (which should be serving on http://localhost:3010/)
    //     // through BrowserSync
    //     proxy: 'http://localhost:3010/',
    //   },
    //   {
    //     // prevent BrowserSync from reloading the page
    //     // and let Webpack Dev Server take care of this
    //     reload: false,
    //   },
    // ),
  );
}
if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name].[chunkhash].js';
  config.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin(),
  );
}
module.exports = config;
