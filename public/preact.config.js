const path = require('path');

export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js";

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  const HtmlWebpackPlugin = helpers.getPluginsByName(config, "HtmlWebpackPlugin")[0];

  HtmlWebpackPlugin.plugin.options.template = '!!raw-loader!' + path.join(__dirname, 'src/index.ejs');

  if (env.production) {
    config.output.libraryTarget = "umd";
  }
};
