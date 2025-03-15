const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            if (webpackConfig.optimization && webpackConfig.optimization.minimizer) {
                const terserPlugin = webpackConfig.optimization.minimizer.find(
                    (plugin) => plugin.constructor.name === 'TerserPlugin'
                );

                if (terserPlugin) {
                    terserPlugin.options.terserOptions = {
                        ...terserPlugin.options.terserOptions,
                        format: {
                            comments: false,
                        },
                    };

                    terserPlugin.options.extractComments = false;
                }
            }

            return webpackConfig;
        },
    },
};
